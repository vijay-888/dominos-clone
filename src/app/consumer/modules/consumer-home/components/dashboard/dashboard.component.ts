import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    stats = [
        {
            title: 'Total Orders',
            value: '24',
            icon: 'pi pi-shopping-cart',
            color: '#3498db',
            // change: '+12%'
        },
        {
            title: 'Favorite Items',
            value: '8',
            icon: 'pi pi-heart',
            color: '#e74c3c',
            // change: '+3'
        },
        {
            title: 'Total Spent',
            value: '$456',
            icon: 'pi pi-dollar',
            color: '#27ae60',
            // change: '+8%'
        },
        {
            title: 'Restaurants',
            value: '12',
            icon: 'pi pi-building',
            color: '#f39c12',
            // change: '+2'
        }
    ];

    recentOrders = [
        {
            id: '#ORD-001',
            restaurant: 'Pizza Palace',
            items: '2x Margherita Pizza',
            total: '$28.99',
            status: 'Delivered',
            date: '2024-01-15',
            statusColor: '#27ae60'
        },
        {
            id: '#ORD-002',
            restaurant: 'Burger House',
            items: '1x Classic Burger',
            total: '$15.50',
            status: 'Preparing',
            date: '2024-01-14',
            statusColor: '#f39c12'
        },
        {
            id: '#ORD-003',
            restaurant: 'Sushi Zen',
            items: '1x California Roll',
            total: '$22.00',
            status: 'Delivered',
            date: '2024-01-13',
            statusColor: '#27ae60'
        }
    ];

    recommendedRestaurants = [
        {
            name: 'Italian Bistro',
            rating: 4.8,
            cuisine: 'Italian',
            deliveryTime: '25-30 min',
            image: 'https://via.placeholder.com/150x100/8e44ad/ffffff?text=Italian'
        },
        {
            name: 'Thai Garden',
            rating: 4.6,
            cuisine: 'Thai',
            deliveryTime: '20-25 min',
            image: 'https://via.placeholder.com/150x100/27ae60/ffffff?text=Thai'
        },
        {
            name: 'Mexican Fiesta',
            rating: 4.7,
            cuisine: 'Mexican',
            deliveryTime: '30-35 min',
            image: 'https://via.placeholder.com/150x100/e74c3c/ffffff?text=Mexican'
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
