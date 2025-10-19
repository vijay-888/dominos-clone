import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  showUserMenu: boolean = false;
  currentRoute: string = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // Subscribe to cart items changes to update cart count
    this.subscriptions.push(
      this.cartService.cartItems$.subscribe((items: any[]) => {
        this.cartItemCount = this.cartService.getCartItemCount();
      })
    );

    // Subscribe to route changes to update active state
    this.subscriptions.push(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        this.currentRoute = event.url;
      })
    );

    // Set initial route
    this.currentRoute = this.router.url;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const userIcon = target.closest('.user-icon');
    const dropdown = target.closest('.user-dropdown-card');

    // Close dropdown if clicking outside both user icon and dropdown
    if (this.showUserMenu && !userIcon && !dropdown) {
      this.showUserMenu = false;
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/consumer/dashboard']);
  }

  goToFavorites(): void {
    this.router.navigate(['/consumer/favorites']);
  }

  goToCart(): void {
    this.router.navigate(['/consumer/cart']);
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute === route;
  }

  shouldShowHeader(): boolean {
    return !this.currentRoute.includes('/auth');
  }

  logout(): void {
    this.showUserMenu = false;
    this.cartService.clearCart();
    this.router.navigate(['/auth/login']);
  }
}
