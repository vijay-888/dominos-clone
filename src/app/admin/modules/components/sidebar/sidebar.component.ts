import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = true;

  menuItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      route: '/admin/dashboard',
      active: true
    },
    {
      label: 'Manage Users',
      icon: 'pi pi-users',
      route: '/admin/manage-users',
      active: false
    },
    {
      label: 'Manage Items',
      icon: 'pi pi-box',
      route: '/admin/manage-items',
      active: false
    },
    {
      label: 'Role Requests',
      icon: 'pi pi-user-plus',
      route: '/admin/role-requests',
      active: false
    },
    {
      label: 'Orders',
      icon: 'pi pi-shopping-cart',
      route: '/admin/orders',
      active: false
    },
    {
      label: 'Analytics',
      icon: 'pi pi-chart-bar',
      route: '/admin/analytics',
      active: false
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      route: '/admin/settings',
      active: false
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  setActiveItem(item: any) {
    this.menuItems.forEach(menuItem => menuItem.active = false);
    item.active = true;
  }

  navigateToRoute(item: any) {
    this.setActiveItem(item);
    this.router.navigate([item.route]);
  }

  logout() {
    // Implement logout functionality here
    console.log('Logout clicked');
    // Navigate back to login page
    this.router.navigate(['/auth/login']);
  }
}
