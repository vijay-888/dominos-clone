import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  currentPage = 'dashboard';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get current route to determine which page to show
    this.route.url.subscribe(url => {
      if (url.length > 0) {
        this.currentPage = url[0].path;
      } else {
        this.currentPage = 'dashboard';
      }
    });
  }

  navigateToManageUsers() {
    this.router.navigate(['/admin/manage-users']);
  }

  navigateToViewOrders() {
    this.router.navigate(['/admin/orders']);
  }

  navigateToManageItems() {
    this.router.navigate(['/admin/manage-items']);
  }

  navigateToRoleRequests() {
    this.router.navigate(['/admin/role-requests']);
  }

  navigateToAnalytics() {
    this.router.navigate(['/admin/analytics']);
  }

  navigateToSettings() {
    this.router.navigate(['/admin/settings']);
  }

  backToDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  getPageTitle(): string {
    switch (this.currentPage) {
      case 'manage-users': return 'Manage Users';
      case 'orders': return 'Orders Management';
      case 'analytics': return 'Analytics';
      case 'settings': return 'Settings';
      default: return 'Admin Dashboard';
    }
  }

  getPageContent(): string {
    switch (this.currentPage) {
      case 'manage-users': return 'User management functionality will be implemented here.';
      case 'orders': return 'Order management functionality will be implemented here.';
      case 'analytics': return 'Analytics and reporting functionality will be implemented here.';
      case 'settings': return 'System settings functionality will be implemented here.';
      default: return 'Welcome to the admin panel';
    }
  }
}
