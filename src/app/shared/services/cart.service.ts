import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category: string;
    description?: string;
}

export interface PromoCode {
    code: string;
    discount: number;
    type: 'percentage' | 'fixed';
    minOrderAmount?: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
    private appliedPromoSubject = new BehaviorSubject<PromoCode | null>(null);

    public cartItems$ = this.cartItemsSubject.asObservable();
    public appliedPromo$ = this.appliedPromoSubject.asObservable();

    // Sample promo codes
    private availablePromoCodes: PromoCode[] = [
        { code: 'SAVE10', discount: 10, type: 'percentage', minOrderAmount: 20 },
        { code: 'FIRSTORDER', discount: 15, type: 'percentage', minOrderAmount: 30 },
        { code: 'FLAT5', discount: 5, type: 'fixed', minOrderAmount: 15 },
        { code: 'WELCOME20', discount: 20, type: 'percentage', minOrderAmount: 50 }
    ];

    constructor() {
        // Load cart from localStorage on service initialization
        this.loadCartFromStorage();
    }

    addToCart(item: any): void {
        const currentItems = this.cartItemsSubject.value;
        const existingItem = currentItems.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            const cartItem: CartItem = {
                id: item.id,
                name: item.name,
                price: this.parsePrice(item.price),
                image: item.image,
                quantity: 1,
                category: item.category,
                description: item.description
            };
            currentItems.push(cartItem);
        }

        this.cartItemsSubject.next(currentItems);
        this.saveCartToStorage();
    }

    removeFromCart(itemId: number): void {
        const currentItems = this.cartItemsSubject.value;
        const updatedItems = currentItems.filter(item => item.id !== itemId);
        this.cartItemsSubject.next(updatedItems);
        this.saveCartToStorage();
    }

    updateQuantity(itemId: number, quantity: number): void {
        if (quantity <= 0) {
            this.removeFromCart(itemId);
            return;
        }

        const currentItems = this.cartItemsSubject.value;
        const item = currentItems.find(cartItem => cartItem.id === itemId);

        if (item) {
            item.quantity = quantity;
            this.cartItemsSubject.next(currentItems);
            this.saveCartToStorage();
        }
    }

    getCartItems(): CartItem[] {
        return this.cartItemsSubject.value;
    }

    getCartTotal(): number {
        return this.cartItemsSubject.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItemCount(): number {
        return this.cartItemsSubject.value.length;
    }

    applyPromoCode(code: string): { success: boolean; message: string } {
        const promoCode = this.availablePromoCodes.find(promo => promo.code.toUpperCase() === code.toUpperCase());

        if (!promoCode) {
            return { success: false, message: 'Invalid promo code' };
        }

        const cartTotal = this.getCartTotal();

        if (promoCode.minOrderAmount && cartTotal < promoCode.minOrderAmount) {
            return {
                success: false,
                message: `Minimum order amount of $${promoCode.minOrderAmount} required`
            };
        }

        this.appliedPromoSubject.next(promoCode);
        return { success: true, message: 'Promo code applied successfully!' };
    }

    removePromoCode(): void {
        this.appliedPromoSubject.next(null);
    }

    getDiscountAmount(): number {
        const appliedPromo = this.appliedPromoSubject.value;
        if (!appliedPromo) return 0;

        const cartTotal = this.getCartTotal();

        if (appliedPromo.type === 'percentage') {
            return (cartTotal * appliedPromo.discount) / 100;
        } else {
            return appliedPromo.discount;
        }
    }

    getFinalTotal(): number {
        const cartTotal = this.getCartTotal();
        const discount = this.getDiscountAmount();
        return Math.max(0, cartTotal - discount);
    }

    clearCart(): void {
        this.cartItemsSubject.next([]);
        this.appliedPromoSubject.next(null);
        this.saveCartToStorage();
    }

    private parsePrice(priceString: string): number {
        return parseFloat(priceString.replace('$', ''));
    }

    private saveCartToStorage(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItemsSubject.value));
        localStorage.setItem('appliedPromo', JSON.stringify(this.appliedPromoSubject.value));
    }

    private loadCartFromStorage(): void {
        const savedCart = localStorage.getItem('cart');
        const savedPromo = localStorage.getItem('appliedPromo');

        if (savedCart) {
            this.cartItemsSubject.next(JSON.parse(savedCart));
        }

        if (savedPromo) {
            this.appliedPromoSubject.next(JSON.parse(savedPromo));
        }
    }
}
