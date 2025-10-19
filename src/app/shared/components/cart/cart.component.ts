import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService, CartItem, PromoCode } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  appliedPromo: PromoCode | null = null;
  promoCodeInput: string = '';
  promoMessage: { success: boolean; message: string } = { success: false, message: '' };

  // Payment modal
  showPaymentModal: boolean = false;
  selectedPaymentMethod: string = '';

  // Confirmation modal
  showConfirmationModal: boolean = false;
  orderId: string = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscribe to cart items changes
    this.subscriptions.push(
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
      })
    );

    // Subscribe to applied promo changes
    this.subscriptions.push(
      this.cartService.appliedPromo$.subscribe(promo => {
        this.appliedPromo = promo;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Cart item management
  increaseQuantity(itemId: number): void {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      this.cartService.updateQuantity(itemId, item.quantity + 1);
    }
  }

  decreaseQuantity(itemId: number): void {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(itemId, item.quantity - 1);
    }
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }

  getTotalItems(): number {
    return this.cartItems.length;
  }

  // Price calculations
  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  getDiscountAmount(): number {
    return this.cartService.getDiscountAmount();
  }

  getDeliveryFee(): number {
    // Free delivery for orders over $30, otherwise $3.99
    return this.getCartTotal() >= 30 ? 0 : 3.99;
  }

  getFinalTotal(): number {
    return this.cartService.getFinalTotal() + this.getDeliveryFee();
  }

  // Promo code functionality
  applyPromoCode(): void {
    if (!this.promoCodeInput.trim()) {
      this.promoMessage = { success: false, message: 'Please enter a promo code' };
      return;
    }

    this.promoMessage = this.cartService.applyPromoCode(this.promoCodeInput);

    if (this.promoMessage.success) {
      this.promoCodeInput = '';
    }

    // Clear message after 3 seconds
    setTimeout(() => {
      this.promoMessage = { success: false, message: '' };
    }, 3000);
  }

  removePromoCode(): void {
    this.cartService.removePromoCode();
  }

  // Payment functionality
  proceedToPayment(): void {
    this.showPaymentModal = true;
    this.selectedPaymentMethod = '';
  }

  closePaymentModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.showPaymentModal = false;
    this.selectedPaymentMethod = '';
  }

  processPayment(): void {
    if (!this.selectedPaymentMethod) {
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      this.showPaymentModal = false;
      this.showConfirmationModal = true;
      this.generateOrderId();
    }, 1500);
  }

  // Order confirmation
  closeConfirmationModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.showConfirmationModal = false;
  }

  generateOrderId(): void {
    // Generate a random order ID
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderId = `ORD${timestamp}${random}`;
  }

  getEstimatedDeliveryTime(): string {
    // Generate random delivery time between 25-45 minutes
    const minutes = Math.floor(Math.random() * 20) + 25;
    return `${minutes} minutes`;
  }

  goToDashboard(): void {
    this.cartService.clearCart();
    this.showConfirmationModal = false;
    this.router.navigate(['/consumer/dashboard']);
  }

  trackOrder(): void {
    // In a real app, this would navigate to order tracking
    alert(`Track your order #${this.orderId} on our app or website!`);
    this.showConfirmationModal = false;
  }
}
