import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = 'all';
  filteredMenuItems: any[] = [];

  categories = [
    { id: 'all', name: 'All Items' },
    { id: 'veg-pizza', name: 'Veg Pizza\'s' },
    { id: 'non-veg-pizza', name: 'Non Veg Pizza\'s' },
    { id: 'burger-pizza', name: 'Burger Pizza\'s' },
    { id: 'pizza-mania', name: 'Pizza Mania' },
    { id: 'sides', name: 'Sides' }
  ];

  menuItems = [
    // Veg Pizza's
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh tomatoes, mozzarella, and basil',
      price: '$12.99',
      rating: 4.5,
      category: 'veg-pizza',
      image: 'assets/images/margarita.jpg'
    },
    {
      id: 2,
      name: 'Veggie Supreme',
      description: 'Loaded with fresh vegetables and premium cheese blend',
      price: '$13.99',
      rating: 4.4,
      category: 'veg-pizza',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Farmhouse Pizza',
      description: 'Fresh vegetables with capsicum, onions, and tomatoes',
      price: '$14.99',
      rating: 4.3,
      category: 'veg-pizza',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Paneer Makhani Pizza',
      description: 'Cottage cheese with makhani sauce and fresh herbs',
      price: '$15.99',
      rating: 4.6,
      category: 'veg-pizza',
      image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop'
    },

    // Non Veg Pizza's
    {
      id: 5,
      name: 'Pepperoni Pizza',
      description: 'Delicious pizza topped with spicy pepperoni and cheese',
      price: '$14.99',
      rating: 4.7,
      category: 'non-veg-pizza',
      image: 'assets/images/pepironi.jpg'
    },
    {
      id: 6,
      name: 'BBQ Chicken Pizza',
      description: 'Grilled chicken with BBQ sauce, onions, and mozzarella',
      price: '$16.99',
      rating: 4.6,
      category: 'non-veg-pizza',
      image: 'assets/images/bbq-chicken.jpg'
    },
    {
      id: 7,
      name: 'Meat Lovers',
      description: 'Pepperoni, sausage, ham, and bacon on a crispy crust',
      price: '$18.99',
      rating: 4.8,
      category: 'non-veg-pizza',
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      name: 'Hawaiian Pizza',
      description: 'Ham, pineapple, and cheese on a thin crust',
      price: '$15.99',
      rating: 4.3,
      category: 'non-veg-pizza',
      image: 'assets/images/hawalian.jpg'
    },
    {
      id: 9,
      name: 'Buffalo Chicken',
      description: 'Spicy buffalo chicken with ranch dressing and cheese',
      price: '$17.99',
      rating: 4.6,
      category: 'non-veg-pizza',
      image: 'assets/images/buffalo-chicken.jpg'
    },
    {
      id: 10,
      name: 'Supreme Pizza',
      description: 'Pepperoni, sausage, peppers, onions, and mushrooms',
      price: '$19.99',
      rating: 4.7,
      category: 'non-veg-pizza',
      image: 'assets/images/supreme-pizza.jpg'
    },

    // Burger Pizza's
    {
      id: 11,
      name: 'Classic Burger Pizza',
      description: 'Burger-style pizza with lettuce, tomato, and special sauce',
      price: '$16.99',
      rating: 4.4,
      category: 'burger-pizza',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop'
    },
    {
      id: 12,
      name: 'Cheeseburger Pizza',
      description: 'Ground beef, cheese, pickles, and burger sauce',
      price: '$17.99',
      rating: 4.5,
      category: 'burger-pizza',
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop'
    },
    {
      id: 13,
      name: 'Bacon Burger Pizza',
      description: 'Crispy bacon, beef, cheese, and tangy sauce',
      price: '$18.99',
      rating: 4.6,
      category: 'burger-pizza',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop'
    },

    // Pizza Mania
    {
      id: 14,
      name: 'Pizza Mania Veg',
      description: 'Budget-friendly veg pizza with fresh toppings',
      price: '$8.99',
      rating: 4.2,
      category: 'pizza-mania',
      image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop'
    },
    {
      id: 15,
      name: 'Pizza Mania Non Veg',
      description: 'Affordable non-veg pizza with quality ingredients',
      price: '$9.99',
      rating: 4.3,
      category: 'pizza-mania',
      image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop'
    },
    {
      id: 16,
      name: 'Pizza Mania Cheese',
      description: 'Simple and delicious cheese pizza at great value',
      price: '$7.99',
      rating: 4.1,
      category: 'pizza-mania',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop'
    },

    // Sides
    {
      id: 17,
      name: 'Garlic Bread',
      description: 'Crispy bread with garlic butter and herbs',
      price: '$4.99',
      rating: 4.4,
      category: 'sides',
      image: 'assets/images/garic-bread.jpg'
    },
    {
      id: 18,
      name: 'Chicken Wings',
      description: 'Spicy buffalo wings with ranch dip',
      price: '$8.99',
      rating: 4.5,
      category: 'sides',
      image: 'assets/images/chicken-wings.jpg'
    },
    {
      id: 19,
      name: 'French Fries',
      description: 'Golden crispy fries with sea salt',
      price: '$3.99',
      rating: 4.2,
      category: 'sides',
      image: 'assets/images/french-fries.jpg'
    },
    {
      id: 20,
      name: 'Chicken Nuggets',
      description: 'Tender chicken nuggets with honey mustard',
      price: '$6.99',
      rating: 4.3,
      category: 'sides',
      image: 'assets/images/chicken-nuggets.jpg'
    },
    {
      id: 21,
      name: 'Onion Rings',
      description: 'Crispy beer-battered onion rings',
      price: '$5.99',
      rating: 4.1,
      category: 'sides',
      image: 'assets/images/onion.jpg'
    }
  ];

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // Initialize filtered items with all menu items
    this.filteredMenuItems = [...this.menuItems];
  }

  filterByCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.applyFilters();
  }

  filterMenuItems(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.menuItems];

    // Apply category filter
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === this.selectedCategory);
    }

    // Apply search filter
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredMenuItems = filtered;
  }

  viewDetails(item: any): void {
    // Navigate to menu item details page with complete item data as route parameters
    this.router.navigate(['/consumer/menu-item', item.id], {
      queryParams: {
        name: encodeURIComponent(item.name),
        description: encodeURIComponent(item.description),
        price: encodeURIComponent(item.price),
        rating: item.rating,
        category: encodeURIComponent(item.category),
        image: encodeURIComponent(item.image)
      }
    });
  }

}
