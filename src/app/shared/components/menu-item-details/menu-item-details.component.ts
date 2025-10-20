import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
    selector: 'app-menu-item-details',
    templateUrl: './menu-item-details.component.html',
    styleUrls: ['./menu-item-details.component.scss']
})
export class MenuItemDetailsComponent implements OnInit {
    @Input() menuItem: any = null;
    isInCart: boolean = false;
    cartItemCount: number = 0;
    isProvider: boolean = false;
    isFavorite: boolean = false;

    // Sample detailed menu item data
    sampleMenuItem = {
        id: 1,
        name: 'Margherita Pizza',
        description: 'Classic pizza with fresh tomatoes, mozzarella, and basil',
        detailedDescription: 'Our signature Margherita pizza features a perfectly thin crust topped with San Marzano tomatoes, fresh mozzarella di bufala, aromatic basil leaves, and a drizzle of extra virgin olive oil. Baked to perfection in our wood-fired oven for that authentic Italian taste.',
        price: '$12.99',
        rating: 4.5,
        category: 'veg-pizza',
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=400&fit=crop',
        largeImage: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&h=600&fit=crop',

        // Additional details
        ingredients: [
            'San Marzano Tomatoes',
            'Fresh Mozzarella di Bufala',
            'Fresh Basil Leaves',
            'Extra Virgin Olive Oil',
            'Sea Salt',
            'Fresh Garlic'
        ],

        nutritionalInfo: {
            calories: 320,
            protein: '18g',
            carbs: '35g',
            fat: '12g',
            fiber: '3g',
            sodium: '680mg'
        },

        allergens: ['Dairy', 'Gluten'],

        preparationTime: '15-20 minutes',

        size: '12 inches',

        reviews: [
            {
                id: 1,
                userName: 'Sarah Johnson',
                rating: 5,
                comment: 'Absolutely delicious! The fresh basil and mozzarella combination is perfect.',
                date: '2024-01-15'
            },
            {
                id: 2,
                userName: 'Mike Chen',
                rating: 4,
                comment: 'Great pizza, authentic Italian taste. Would definitely order again.',
                date: '2024-01-12'
            },
            {
                id: 3,
                userName: 'Emily Davis',
                rating: 5,
                comment: 'Best Margherita pizza I\'ve had in a long time. Highly recommended!',
                date: '2024-01-10'
            }
        ],

        similarItems: [
            {
                id: 2,
                name: 'Veggie Supreme',
                price: '$13.99',
                image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&h=150&fit=crop'
            },
            {
                id: 3,
                name: 'Farmhouse Pizza',
                price: '$14.99',
                image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&h=150&fit=crop'
            }
        ]
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cartService: CartService,
        private favoritesService: FavoritesService
    ) { }

    ngOnInit(): void {
        // Determine user role based on current URL
        const currentUrl = this.router.url;
        this.isProvider = currentUrl.includes('/provider/');

        // Get item ID from route parameters
        const itemId = this.route.snapshot.paramMap.get('id');

        // Get complete item data from query parameters
        const queryParams = this.route.snapshot.queryParams;

        if (queryParams && Object.keys(queryParams).length > 0) {
            // Use the passed menu item data from query parameters and enhance it
            const passedItem = {
                id: parseInt(itemId || '1'),
                name: this.decodeUrlParam(queryParams['name']),
                description: this.decodeUrlParam(queryParams['description']),
                price: this.decodeUrlParam(queryParams['price']),
                rating: parseFloat(queryParams['rating']),
                category: this.decodeUrlParam(queryParams['category']),
                image: this.decodeUrlParam(queryParams['image'])
            };
            this.menuItem = this.enhanceMenuItemWithDetails(passedItem);
        } else if (itemId) {
            // Fallback: Find the specific item based on ID from hardcoded data
            this.menuItem = this.getItemDetailsById(parseInt(itemId));
        } else if (!this.menuItem) {
            // If no item is passed and no route param, use sample data
            this.menuItem = this.sampleMenuItem;
        }

        // Check if item is in cart and update button state (only for consumers)
        if (!this.isProvider) {
            this.checkCartStatus();
            this.isFavorite = this.favoritesService.isFavorite(this.menuItem.id);
        }
    }

    enhanceMenuItemWithDetails(item: any): any {
        // Enhance the passed menu item with detailed information
        const enhancedItem = { ...item };

        // Add detailed description based on category and name
        enhancedItem.detailedDescription = this.generateDetailedDescription(item);

        // Add ingredients based on category and name
        enhancedItem.ingredients = this.generateIngredients(item);

        // Add nutritional information based on category
        enhancedItem.nutritionalInfo = this.generateNutritionalInfo(item);

        // Add allergens based on category
        enhancedItem.allergens = this.generateAllergens(item);

        // Add preparation time based on category
        enhancedItem.preparationTime = this.generatePreparationTime(item);

        // Add size information
        enhancedItem.size = this.generateSize(item);

        // Add reviews based on item
        enhancedItem.reviews = this.generateReviews(item);

        // Add similar items based on category
        enhancedItem.similarItems = this.generateSimilarItems(item);

        // Add large image
        enhancedItem.largeImage = item.image;

        return enhancedItem;
    }

    generateDetailedDescription(item: any): string {
        const descriptions: { [key: string]: string } = {
            'Margherita Pizza': 'Our signature Margherita pizza features a perfectly thin crust topped with San Marzano tomatoes, fresh mozzarella di bufala, aromatic basil leaves, and a drizzle of extra virgin olive oil. Baked to perfection in our wood-fired oven for that authentic Italian taste.',
            'Veggie Supreme': 'A vegetarian delight featuring a crispy thin crust loaded with fresh bell peppers, red onions, mushrooms, black olives, tomatoes, and our signature three-cheese blend. Topped with oregano and a light drizzle of olive oil for the perfect finish.',
            'Farmhouse Pizza': 'Fresh farm-to-table ingredients on a crispy crust! Loaded with capsicum, onions, tomatoes, mushrooms, and our premium cheese blend. Perfect for those who love fresh vegetables.',
            'Paneer Makhani Pizza': 'A fusion delight featuring cottage cheese cubes in rich makhani sauce, topped with fresh herbs and mozzarella cheese. A perfect blend of Indian flavors on Italian pizza crust.',
            'Pepperoni Pizza': 'A classic favorite featuring our signature thin crust topped with premium spicy pepperoni, mozzarella cheese, and our special tomato sauce. Finished with a sprinkle of oregano and baked to golden perfection.',
            'BBQ Chicken Pizza': 'Grilled chicken breast marinated in BBQ sauce, topped with red onions, mozzarella cheese, and our signature BBQ sauce drizzle. A smoky, savory delight.',
            'Meat Lovers': 'The ultimate meat feast! Our thick crust pizza loaded with premium pepperoni, Italian sausage, smoked ham, crispy bacon, and mozzarella cheese. Perfect for meat enthusiasts who crave bold flavors.',
            'Hawaiian Pizza': 'A tropical twist on classic pizza! Sweet pineapple chunks paired with savory ham and melted mozzarella cheese on our thin crust. A perfect balance of sweet and savory.',
            'Buffalo Chicken': 'Spicy buffalo chicken breast with ranch dressing, mozzarella cheese, and red onions on our crispy crust. Perfect for those who love a little heat!',
            'Supreme Pizza': 'Our most loaded pizza! Pepperoni, sausage, peppers, onions, mushrooms, and mozzarella cheese on a crispy crust. Everything you love in one delicious pizza.',
            'Classic Burger Pizza': 'A unique fusion creation! Our crispy crust topped with seasoned ground beef, melted cheese, fresh lettuce, tomatoes, pickles, and our signature burger sauce. It\'s like having a burger and pizza in one!',
            'Cheeseburger Pizza': 'Ground beef patty with melted cheese, pickles, onions, and our special burger sauce on pizza crust. A creative take on the classic cheeseburger.',
            'Bacon Burger Pizza': 'Crispy bacon strips with seasoned beef, melted cheese, lettuce, tomatoes, and tangy sauce on our pizza crust. A bacon lover\'s dream!',
            'Pizza Mania Veg': 'Budget-friendly vegetarian pizza with fresh vegetables and quality cheese. Great value without compromising on taste and freshness.',
            'Pizza Mania Non Veg': 'Affordable non-vegetarian pizza with quality meat toppings and cheese. Perfect for meat lovers on a budget.',
            'Pizza Mania Cheese': 'Simple and delicious cheese pizza at great value. Perfect for cheese lovers who want quality without the extra cost.',
            'Garlic Bread': 'Our famous garlic bread features freshly baked Italian bread brushed with garlic butter, sprinkled with herbs, and topped with melted mozzarella cheese. Perfect as a side or appetizer.',
            'Chicken Wings': 'Spicy buffalo chicken wings served with ranch dip. Crispy on the outside, tender on the inside, and packed with flavor.',
            'French Fries': 'Golden crispy fries seasoned with sea salt. Perfectly cooked to achieve the ideal balance of crispy exterior and fluffy interior.',
            'Chicken Nuggets': 'Tender chicken nuggets served with honey mustard dip. Made with quality chicken breast and seasoned to perfection.',
            'Onion Rings': 'Crispy beer-battered onion rings with a golden exterior and sweet onion interior. Perfect as a side or appetizer.'
        };

        return descriptions[item.name] || item.description + ' - A delicious choice made with fresh ingredients and our signature preparation methods.';
    }

    generateIngredients(item: any): string[] {
        const ingredientsMap: { [key: string]: string[] } = {
            'Margherita Pizza': ['San Marzano Tomatoes', 'Fresh Mozzarella di Bufala', 'Fresh Basil Leaves', 'Extra Virgin Olive Oil', 'Sea Salt', 'Fresh Garlic'],
            'Veggie Supreme': ['Bell Peppers', 'Red Onions', 'Mushrooms', 'Black Olives', 'Fresh Tomatoes', 'Mozzarella', 'Cheddar', 'Parmesan', 'Oregano'],
            'Farmhouse Pizza': ['Capsicum', 'Red Onions', 'Fresh Tomatoes', 'Mushrooms', 'Mozzarella Cheese', 'Oregano', 'Olive Oil'],
            'Paneer Makhani Pizza': ['Paneer Cubes', 'Makhani Sauce', 'Fresh Herbs', 'Mozzarella Cheese', 'Tomato Sauce', 'Garlic'],
            'Pepperoni Pizza': ['Spicy Pepperoni', 'Mozzarella Cheese', 'Tomato Sauce', 'Oregano', 'Garlic', 'Olive Oil'],
            'BBQ Chicken Pizza': ['Grilled Chicken', 'BBQ Sauce', 'Red Onions', 'Mozzarella Cheese', 'Cilantro'],
            'Meat Lovers': ['Pepperoni', 'Italian Sausage', 'Smoked Ham', 'Crispy Bacon', 'Mozzarella Cheese', 'Tomato Sauce', 'Garlic'],
            'Hawaiian Pizza': ['Ham', 'Pineapple Chunks', 'Mozzarella Cheese', 'Tomato Sauce', 'Oregano'],
            'Buffalo Chicken': ['Buffalo Chicken', 'Ranch Dressing', 'Mozzarella Cheese', 'Red Onions', 'Cilantro'],
            'Supreme Pizza': ['Pepperoni', 'Sausage', 'Bell Peppers', 'Onions', 'Mushrooms', 'Mozzarella Cheese', 'Tomato Sauce'],
            'Classic Burger Pizza': ['Seasoned Ground Beef', 'Mozzarella Cheese', 'Fresh Lettuce', 'Tomatoes', 'Pickles', 'Burger Sauce', 'Onions'],
            'Cheeseburger Pizza': ['Ground Beef Patty', 'Cheese', 'Pickles', 'Onions', 'Burger Sauce', 'Mozzarella'],
            'Bacon Burger Pizza': ['Crispy Bacon', 'Ground Beef', 'Cheese', 'Lettuce', 'Tomatoes', 'Tangy Sauce'],
            'Pizza Mania Veg': ['Mixed Vegetables', 'Mozzarella Cheese', 'Tomato Sauce', 'Oregano'],
            'Pizza Mania Non Veg': ['Chicken', 'Pepperoni', 'Mozzarella Cheese', 'Tomato Sauce', 'Oregano'],
            'Pizza Mania Cheese': ['Mozzarella Cheese', 'Cheddar Cheese', 'Tomato Sauce', 'Oregano'],
            'Garlic Bread': ['Italian Bread', 'Garlic Butter', 'Fresh Herbs', 'Mozzarella Cheese', 'Parmesan', 'Olive Oil'],
            'Chicken Wings': ['Chicken Wings', 'Buffalo Sauce', 'Ranch Dip', 'Celery'],
            'French Fries': ['Potatoes', 'Sea Salt', 'Vegetable Oil'],
            'Chicken Nuggets': ['Chicken Breast', 'Bread Crumbs', 'Honey Mustard Dip', 'Spices'],
            'Onion Rings': ['Onions', 'Beer Batter', 'Vegetable Oil', 'Sea Salt']
        };

        return ingredientsMap[item.name] || ['Fresh Ingredients', 'Quality Cheese', 'Signature Sauce', 'Herbs & Spices'];
    }

    generateNutritionalInfo(item: any): any {
        const nutritionMap: { [key: string]: any } = {
            'Margherita Pizza': { calories: 320, protein: '18g', carbs: '35g', fat: '12g', fiber: '3g', sodium: '680mg' },
            'Veggie Supreme': { calories: 280, protein: '16g', carbs: '32g', fat: '10g', fiber: '5g', sodium: '720mg' },
            'Farmhouse Pizza': { calories: 290, protein: '17g', carbs: '33g', fat: '11g', fiber: '4g', sodium: '700mg' },
            'Paneer Makhani Pizza': { calories: 350, protein: '20g', carbs: '36g', fat: '14g', fiber: '2g', sodium: '750mg' },
            'Pepperoni Pizza': { calories: 380, protein: '22g', carbs: '38g', fat: '16g', fiber: '2g', sodium: '890mg' },
            'BBQ Chicken Pizza': { calories: 360, protein: '24g', carbs: '36g', fat: '14g', fiber: '2g', sodium: '820mg' },
            'Meat Lovers': { calories: 520, protein: '28g', carbs: '42g', fat: '24g', fiber: '2g', sodium: '1200mg' },
            'Hawaiian Pizza': { calories: 340, protein: '19g', carbs: '37g', fat: '13g', fiber: '2g', sodium: '780mg' },
            'Buffalo Chicken': { calories: 370, protein: '25g', carbs: '35g', fat: '15g', fiber: '2g', sodium: '850mg' },
            'Supreme Pizza': { calories: 450, protein: '26g', carbs: '40g', fat: '18g', fiber: '3g', sodium: '950mg' },
            'Classic Burger Pizza': { calories: 450, protein: '24g', carbs: '40g', fat: '20g', fiber: '3g', sodium: '950mg' },
            'Cheeseburger Pizza': { calories: 470, protein: '26g', carbs: '42g', fat: '22g', fiber: '2g', sodium: '980mg' },
            'Bacon Burger Pizza': { calories: 490, protein: '28g', carbs: '44g', fat: '24g', fiber: '2g', sodium: '1020mg' },
            'Pizza Mania Veg': { calories: 250, protein: '14g', carbs: '30g', fat: '8g', fiber: '3g', sodium: '600mg' },
            'Pizza Mania Non Veg': { calories: 280, protein: '18g', carbs: '32g', fat: '10g', fiber: '2g', sodium: '650mg' },
            'Pizza Mania Cheese': { calories: 220, protein: '12g', carbs: '28g', fat: '7g', fiber: '1g', sodium: '550mg' },
            'Garlic Bread': { calories: 180, protein: '8g', carbs: '22g', fat: '7g', fiber: '1g', sodium: '420mg' },
            'Chicken Wings': { calories: 320, protein: '28g', carbs: '2g', fat: '22g', fiber: '0g', sodium: '680mg' },
            'French Fries': { calories: 320, protein: '4g', carbs: '38g', fat: '16g', fiber: '3g', sodium: '480mg' },
            'Chicken Nuggets': { calories: 280, protein: '22g', carbs: '18g', fat: '14g', fiber: '1g', sodium: '520mg' },
            'Onion Rings': { calories: 240, protein: '3g', carbs: '28g', fat: '12g', fiber: '2g', sodium: '380mg' }
        };

        return nutritionMap[item.name] || { calories: 300, protein: '15g', carbs: '35g', fat: '12g', fiber: '2g', sodium: '600mg' };
    }

    generateAllergens(item: any): string[] {
        const allergenMap: { [key: string]: string[] } = {
            'Margherita Pizza': ['Dairy', 'Gluten'],
            'Veggie Supreme': ['Dairy', 'Gluten'],
            'Farmhouse Pizza': ['Dairy', 'Gluten'],
            'Paneer Makhani Pizza': ['Dairy', 'Gluten'],
            'Pepperoni Pizza': ['Dairy', 'Gluten', 'Pork'],
            'BBQ Chicken Pizza': ['Dairy', 'Gluten'],
            'Meat Lovers': ['Dairy', 'Gluten', 'Pork'],
            'Hawaiian Pizza': ['Dairy', 'Gluten', 'Pork'],
            'Buffalo Chicken': ['Dairy', 'Gluten'],
            'Supreme Pizza': ['Dairy', 'Gluten', 'Pork'],
            'Classic Burger Pizza': ['Dairy', 'Gluten', 'Beef'],
            'Cheeseburger Pizza': ['Dairy', 'Gluten', 'Beef'],
            'Bacon Burger Pizza': ['Dairy', 'Gluten', 'Beef', 'Pork'],
            'Pizza Mania Veg': ['Dairy', 'Gluten'],
            'Pizza Mania Non Veg': ['Dairy', 'Gluten'],
            'Pizza Mania Cheese': ['Dairy', 'Gluten'],
            'Garlic Bread': ['Dairy', 'Gluten'],
            'Chicken Wings': ['None'],
            'French Fries': ['None'],
            'Chicken Nuggets': ['Gluten'],
            'Onion Rings': ['Gluten']
        };

        return allergenMap[item.name] || ['Dairy', 'Gluten'];
    }

    generatePreparationTime(item: any): string {
        const timeMap: { [key: string]: string } = {
            'Margherita Pizza': '15-20 minutes',
            'Veggie Supreme': '18-22 minutes',
            'Farmhouse Pizza': '16-20 minutes',
            'Paneer Makhani Pizza': '18-22 minutes',
            'Pepperoni Pizza': '16-20 minutes',
            'BBQ Chicken Pizza': '18-22 minutes',
            'Meat Lovers': '20-25 minutes',
            'Hawaiian Pizza': '16-20 minutes',
            'Buffalo Chicken': '18-22 minutes',
            'Supreme Pizza': '20-25 minutes',
            'Classic Burger Pizza': '18-22 minutes',
            'Cheeseburger Pizza': '18-22 minutes',
            'Bacon Burger Pizza': '20-25 minutes',
            'Pizza Mania Veg': '12-15 minutes',
            'Pizza Mania Non Veg': '14-18 minutes',
            'Pizza Mania Cheese': '10-12 minutes',
            'Garlic Bread': '8-12 minutes',
            'Chicken Wings': '15-20 minutes',
            'French Fries': '8-10 minutes',
            'Chicken Nuggets': '12-15 minutes',
            'Onion Rings': '10-12 minutes'
        };

        return timeMap[item.name] || '15-20 minutes';
    }

    generateSize(item: any): string {
        if (item.category === 'sides') {
            return 'Regular';
        }
        return '12 inches';
    }

    generateReviews(item: any): any[] {
        const reviewTemplates = [
            { userName: 'Sarah Johnson', rating: 5, comment: 'Absolutely delicious! Perfect taste and quality.', date: '2024-01-15' },
            { userName: 'Mike Chen', rating: 4, comment: 'Great flavor and authentic taste. Would definitely order again.', date: '2024-01-12' },
            { userName: 'Emily Davis', rating: 5, comment: 'Best I\'ve had in a long time. Highly recommended!', date: '2024-01-10' },
            { userName: 'John Smith', rating: 4, comment: 'Excellent quality and great value for money.', date: '2024-01-08' },
            { userName: 'Lisa Wang', rating: 5, comment: 'Perfect for my taste buds. Will order again soon!', date: '2024-01-05' }
        ];

        // Return 2-3 random reviews
        const numReviews = Math.floor(Math.random() * 2) + 2; // 2-3 reviews
        return reviewTemplates.slice(0, numReviews);
    }

    generateSimilarItems(item: any): any[] {
        const similarItemsMap: { [key: string]: any[] } = {
            'Margherita Pizza': [
                { id: 2, name: 'Veggie Supreme', price: '$13.99', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&h=150&fit=crop' },
                { id: 3, name: 'Farmhouse Pizza', price: '$14.99', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&h=150&fit=crop' }
            ],
            'Veggie Supreme': [
                { id: 1, name: 'Margherita Pizza', price: '$12.99', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=150&fit=crop' },
                { id: 3, name: 'Farmhouse Pizza', price: '$14.99', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&h=150&fit=crop' }
            ],
            'Pepperoni Pizza': [
                { id: 7, name: 'Meat Lovers', price: '$18.99', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&h=150&fit=crop' },
                { id: 10, name: 'Supreme Pizza', price: '$19.99', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=150&fit=crop' }
            ],
            'Meat Lovers': [
                { id: 5, name: 'Pepperoni Pizza', price: '$14.99', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=150&fit=crop' },
                { id: 10, name: 'Supreme Pizza', price: '$19.99', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=150&fit=crop' }
            ],
            'Classic Burger Pizza': [
                { id: 12, name: 'Cheeseburger Pizza', price: '$17.99', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=150&fit=crop' },
                { id: 13, name: 'Bacon Burger Pizza', price: '$18.99', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=150&fit=crop' }
            ],
            'Garlic Bread': [
                { id: 19, name: 'French Fries', price: '$3.99', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=150&fit=crop' },
                { id: 21, name: 'Onion Rings', price: '$5.99', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=150&fit=crop' }
            ]
        };

        return similarItemsMap[item.name] || [
            { id: 1, name: 'Margherita Pizza', price: '$12.99', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=150&fit=crop' },
            { id: 5, name: 'Pepperoni Pizza', price: '$14.99', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=150&fit=crop' }
        ];
    }

    getItemDetailsById(id: number): any {
        // Hardcoded detailed information for each menu item
        const detailedItems: { [key: number]: any } = {
            1: {
                id: 1,
                name: 'Margherita Pizza',
                description: 'Classic pizza with fresh tomatoes, mozzarella, and basil',
                detailedDescription: 'Our signature Margherita pizza features a perfectly thin crust topped with San Marzano tomatoes, fresh mozzarella di bufala, aromatic basil leaves, and a drizzle of extra virgin olive oil. Baked to perfection in our wood-fired oven for that authentic Italian taste.',
                price: '$12.99',
                rating: 4.5,
                category: 'veg-pizza',
                image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=400&fit=crop',
                largeImage: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&h=600&fit=crop',
                ingredients: ['San Marzano Tomatoes', 'Fresh Mozzarella di Bufala', 'Fresh Basil Leaves', 'Extra Virgin Olive Oil', 'Sea Salt', 'Fresh Garlic'],
                nutritionalInfo: { calories: 320, protein: '18g', carbs: '35g', fat: '12g', fiber: '3g', sodium: '680mg' },
                allergens: ['Dairy', 'Gluten'],
                preparationTime: '15-20 minutes',
                size: '12 inches',
                reviews: [
                    { id: 1, userName: 'Sarah Johnson', rating: 5, comment: 'Absolutely delicious! The fresh basil and mozzarella combination is perfect.', date: '2024-01-15' },
                    { id: 2, userName: 'Mike Chen', rating: 4, comment: 'Great pizza, authentic Italian taste. Would definitely order again.', date: '2024-01-12' }
                ],
                similarItems: [
                    { id: 2, name: 'Veggie Supreme', price: '$13.99', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&h=150&fit=crop' },
                    { id: 3, name: 'Farmhouse Pizza', price: '$14.99', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&h=150&fit=crop' }
                ]
            },
            2: {
                id: 2,
                name: 'Veggie Supreme',
                description: 'Loaded with fresh vegetables and premium cheese blend',
                detailedDescription: 'A vegetarian delight featuring a crispy thin crust loaded with fresh bell peppers, red onions, mushrooms, black olives, tomatoes, and our signature three-cheese blend. Topped with oregano and a light drizzle of olive oil for the perfect finish.',
                price: '$13.99',
                rating: 4.4,
                category: 'veg-pizza',
                image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=400&fit=crop',
                largeImage: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop',
                ingredients: ['Bell Peppers', 'Red Onions', 'Mushrooms', 'Black Olives', 'Fresh Tomatoes', 'Mozzarella', 'Cheddar', 'Parmesan', 'Oregano'],
                nutritionalInfo: { calories: 280, protein: '16g', carbs: '32g', fat: '10g', fiber: '5g', sodium: '720mg' },
                allergens: ['Dairy', 'Gluten'],
                preparationTime: '18-22 minutes',
                size: '12 inches',
                reviews: [
                    { id: 1, userName: 'Lisa Wang', rating: 5, comment: 'Perfect for vegetarians! So many fresh vegetables and great flavor.', date: '2024-01-14' },
                    { id: 2, userName: 'David Kumar', rating: 4, comment: 'Excellent veggie pizza with quality ingredients.', date: '2024-01-11' }
                ],
                similarItems: [
                    { id: 1, name: 'Margherita Pizza', price: '$12.99', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=150&fit=crop' },
                    { id: 3, name: 'Farmhouse Pizza', price: '$14.99', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&h=150&fit=crop' }
                ]
            },
            5: {
                id: 5,
                name: 'Pepperoni Pizza',
                description: 'Delicious pizza topped with spicy pepperoni and cheese',
                detailedDescription: 'A classic favorite featuring our signature thin crust topped with premium spicy pepperoni, mozzarella cheese, and our special tomato sauce. Finished with a sprinkle of oregano and baked to golden perfection.',
                price: '$14.99',
                rating: 4.7,
                category: 'non-veg-pizza',
                image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop',
                largeImage: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&h=600&fit=crop',
                ingredients: ['Spicy Pepperoni', 'Mozzarella Cheese', 'Tomato Sauce', 'Oregano', 'Garlic', 'Olive Oil'],
                nutritionalInfo: { calories: 380, protein: '22g', carbs: '38g', fat: '16g', fiber: '2g', sodium: '890mg' },
                allergens: ['Dairy', 'Gluten', 'Pork'],
                preparationTime: '16-20 minutes',
                size: '12 inches',
                reviews: [
                    { id: 1, userName: 'John Smith', rating: 5, comment: 'Best pepperoni pizza in town! Spicy and delicious.', date: '2024-01-13' },
                    { id: 2, userName: 'Maria Garcia', rating: 4, comment: 'Great flavor and quality pepperoni. Highly recommended!', date: '2024-01-10' }
                ],
                similarItems: [
                    { id: 7, name: 'Meat Lovers', price: '$18.99', image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&h=150&fit=crop' },
                    { id: 10, name: 'Supreme Pizza', price: '$19.99', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=150&fit=crop' }
                ]
            },
            7: {
                id: 7,
                name: 'Meat Lovers',
                description: 'Pepperoni, sausage, ham, and bacon on a crispy crust',
                detailedDescription: 'The ultimate meat feast! Our thick crust pizza loaded with premium pepperoni, Italian sausage, smoked ham, crispy bacon, and mozzarella cheese. Perfect for meat enthusiasts who crave bold flavors.',
                price: '$18.99',
                rating: 4.8,
                category: 'non-veg-pizza',
                image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&h=400&fit=crop',
                largeImage: 'https://images.unsplash.com/photo-1571997478779-2adcb9ab2f?w=800&h=600&fit=crop',
                ingredients: ['Pepperoni', 'Italian Sausage', 'Smoked Ham', 'Crispy Bacon', 'Mozzarella Cheese', 'Tomato Sauce', 'Garlic'],
                nutritionalInfo: { calories: 520, protein: '28g', carbs: '42g', fat: '24g', fiber: '2g', sodium: '1200mg' },
                allergens: ['Dairy', 'Gluten', 'Pork'],
                preparationTime: '20-25 minutes',
                size: '12 inches',
                reviews: [
                    { id: 1, userName: 'Tom Wilson', rating: 5, comment: 'Incredible! So much meat and flavor. Worth every penny!', date: '2024-01-12' },
                    { id: 2, userName: 'Jennifer Lee', rating: 5, comment: 'Perfect for meat lovers. Amazing combination of flavors.', date: '2024-01-09' }
                ],
                similarItems: [
                    { id: 5, name: 'Pepperoni Pizza', price: '$14.99', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=150&fit=crop' },
                    { id: 10, name: 'Supreme Pizza', price: '$19.99', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=150&fit=crop' }
                ]
            },
            11: {
                id: 11,
                name: 'Classic Burger Pizza',
                description: 'Burger-style pizza with lettuce, tomato, and special sauce',
                detailedDescription: 'A unique fusion creation! Our crispy crust topped with seasoned ground beef, melted cheese, fresh lettuce, tomatoes, pickles, and our signature burger sauce. It\'s like having a burger and pizza in one!',
                price: '$16.99',
                rating: 4.4,
                category: 'burger-pizza',
                image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=400&fit=crop',
                largeImage: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=600&fit=crop',
                ingredients: ['Seasoned Ground Beef', 'Mozzarella Cheese', 'Fresh Lettuce', 'Tomatoes', 'Pickles', 'Burger Sauce', 'Onions'],
                nutritionalInfo: { calories: 450, protein: '24g', carbs: '40g', fat: '20g', fiber: '3g', sodium: '950mg' },
                allergens: ['Dairy', 'Gluten', 'Beef'],
                preparationTime: '18-22 minutes',
                size: '12 inches',
                reviews: [
                    { id: 1, userName: 'Alex Rodriguez', rating: 4, comment: 'Creative concept! Tastes like a burger on pizza crust.', date: '2024-01-11' },
                    { id: 2, userName: 'Emma Thompson', rating: 5, comment: 'Love this fusion! Perfect for burger and pizza lovers.', date: '2024-01-08' }
                ],
                similarItems: [
                    { id: 12, name: 'Cheeseburger Pizza', price: '$17.99', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=150&fit=crop' },
                    { id: 13, name: 'Bacon Burger Pizza', price: '$18.99', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=150&fit=crop' }
                ]
            },
            17: {
                id: 17,
                name: 'Garlic Bread',
                description: 'Crispy bread with garlic butter and herbs',
                detailedDescription: 'Our famous garlic bread features freshly baked Italian bread brushed with garlic butter, sprinkled with herbs, and topped with melted mozzarella cheese. Perfect as a side or appetizer.',
                price: '$4.99',
                rating: 4.4,
                category: 'sides',
                image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&h=400&fit=crop',
                largeImage: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&h=600&fit=crop',
                ingredients: ['Italian Bread', 'Garlic Butter', 'Fresh Herbs', 'Mozzarella Cheese', 'Parmesan', 'Olive Oil'],
                nutritionalInfo: { calories: 180, protein: '8g', carbs: '22g', fat: '7g', fiber: '1g', sodium: '420mg' },
                allergens: ['Dairy', 'Gluten'],
                preparationTime: '8-12 minutes',
                size: '6 pieces',
                reviews: [
                    { id: 1, userName: 'Chris Brown', rating: 5, comment: 'Perfect garlic bread! Great as a side with pizza.', date: '2024-01-10' },
                    { id: 2, userName: 'Anna Davis', rating: 4, comment: 'Delicious and crispy. Love the garlic flavor.', date: '2024-01-07' }
                ],
                similarItems: [
                    { id: 19, name: 'French Fries', price: '$3.99', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=150&fit=crop' },
                    { id: 21, name: 'Onion Rings', price: '$5.99', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=150&fit=crop' }
                ]
            }
        };

        return detailedItems[id] || this.sampleMenuItem;
    }

    goBack(): void {
        // Determine user role based on current URL
        const currentUrl = this.router.url;
        const isProvider = currentUrl.includes('/provider/');
        const isConsumer = currentUrl.includes('/consumer/');

        // Set the base route based on user role
        const baseRoute = isProvider ? '/provider' : isConsumer ? '/consumer' : '/consumer';

        // Navigate back to dashboard based on user role
        this.router.navigate([`${baseRoute}/dashboard`]);
    }

    addToCart(): void {
        this.cartService.addToCart(this.menuItem);
        this.checkCartStatus();
        alert(`Added "${this.menuItem.name}" to your cart! Price: ${this.menuItem.price}`);
    }

    viewCart(): void {
        // Determine user role based on current URL
        const currentUrl = this.router.url;
        const isProvider = currentUrl.includes('/provider/');
        const isConsumer = currentUrl.includes('/consumer/');

        if (isProvider) {
            // Providers don't have a cart, redirect to dashboard
            this.router.navigate(['/provider/dashboard']);
        } else {
            // Consumers can view their cart
            const baseRoute = isConsumer ? '/consumer' : '/consumer';
            this.router.navigate([`${baseRoute}/cart`]);
        }
    }

    checkCartStatus(): void {
        const cartItems = this.cartService.getCartItems();
        const cartItem = cartItems.find(item => item.id === this.menuItem.id);
        this.isInCart = !!cartItem;
        this.cartItemCount = cartItem ? cartItem.quantity : 0;
    }

    addToFavorites(): void {
        this.favoritesService.toggleFavorite({
            id: this.menuItem.id,
            name: this.menuItem.name,
            price: this.menuItem.price,
            image: this.menuItem.image || this.menuItem.largeImage,
            category: this.menuItem.category
        });
        alert(`Updated favorites for "${this.menuItem.name}"`);
    }

    onFavoriteClick(): void {
        if (!this.isFavorite) {
            this.addToFavorites();
            this.isFavorite = true;
            // Navigate to favorites after adding
            this.router.navigate(['/consumer/favorites']);
        } else {
            // Already favorite, take user to favorites page
            this.router.navigate(['/consumer/favorites']);
        }
    }

    getStarArray(rating: number): number[] {
        return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? 1 : 0);
    }

    getHalfStar(rating: number): boolean {
        return rating % 1 !== 0;
    }

    private decodeUrlParam(param: string): string {
        return param ? decodeURIComponent(param) : '';
    }
}
