import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isCollapsed = true;
    @Output() collapsedChange = new EventEmitter<boolean>();

    menuItems = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            route: '/provider/dashboard',
            active: false
        },
        {
            label: 'My Items',
            icon: 'pi pi-box',
            route: '/provider/my-items',
            active: false
        },
        {
            label: 'Add Items',
            icon: 'pi pi-plus',
            route: '/provider/add-items',
            active: false
        },
        {
            label: 'View Items',
            icon: 'pi pi-eye',
            route: '/provider/view-items',
            active: false
        },
        {
            label: 'Settings',
            icon: 'pi pi-cog',
            route: '/provider/settings',
            active: false
        }
    ];

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
        this.collapsedChange.emit(this.isCollapsed);
    }

    // Active state now handled by RouterLinkActive in template

    logout() {
        // Implement logout functionality here
        console.log('Logout clicked');
        // Navigate back to login page
        this.router.navigate(['/']);
    }
}
