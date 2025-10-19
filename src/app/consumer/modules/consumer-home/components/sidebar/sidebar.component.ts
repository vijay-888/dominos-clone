import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isCollapsed = false;

    menuItems = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            route: '/consumer/dashboard',
            active: true
        },
        {
            label: 'Favorites',
            icon: 'pi pi-heart',
            route: '/consumer/favorites',
            active: false
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            route: '/consumer/profile',
            active: false
        },
        {
            label: 'Settings',
            icon: 'pi pi-cog',
            route: '/consumer/settings',
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
        this.router.navigate(['/']);
    }
}
