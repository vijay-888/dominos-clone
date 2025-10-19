import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.scss']
})
export class ManageItemsComponent implements OnInit {
  items: any[] = [];
  loading = false;
  selectedItems: any[] = [];

  // Sample data - in real app, this would come from API
  sampleItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh tomatoes, mozzarella, and basil',
      price: '$12.99',
      category: 'Veg Pizza',
      status: 'Approved',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      rating: 4.5,
      orders: 45,
      image: 'assets/images/margarita.jpg',
      providerName: 'Pizza Palace',
      providerEmail: 'pizza@palace.com'
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      description: 'Delicious pizza topped with spicy pepperoni and cheese',
      price: '$14.99',
      category: 'Non Veg Pizza',
      status: 'Approved',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      rating: 4.7,
      orders: 78,
      image: 'assets/images/pepironi.jpg',
      providerName: 'Pizza Palace',
      providerEmail: 'pizza@palace.com'
    },
    {
      id: 3,
      name: 'BBQ Chicken Pizza',
      description: 'Grilled chicken with BBQ sauce, onions, and mozzarella',
      price: '$16.99',
      category: 'Non Veg Pizza',
      status: 'Pending Review',
      createdAt: '2024-01-22',
      updatedAt: '2024-01-22',
      rating: 0,
      orders: 0,
      image: 'assets/images/bbq-chicken.jpg',
      providerName: 'Chicken Corner',
      providerEmail: 'chicken@corner.com'
    },
    {
      id: 4,
      name: 'Garlic Bread',
      description: 'Crispy bread with garlic butter and herbs',
      price: '$4.99',
      category: 'Sides',
      status: 'Approved',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-15',
      rating: 4.4,
      orders: 32,
      image: 'assets/images/garic-bread.jpg',
      providerName: 'Bread Bakery',
      providerEmail: 'bread@bakery.com'
    },
    {
      id: 5,
      name: 'Hawaiian Pizza',
      description: 'Ham, pineapple, and cheese on a thin crust',
      price: '$15.99',
      category: 'Non Veg Pizza',
      status: 'Pending Review',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-25',
      rating: 0,
      orders: 0,
      image: 'assets/images/hawalian.jpg',
      providerName: 'Tropical Pizza',
      providerEmail: 'tropical@pizza.com'
    },
    {
      id: 6,
      name: 'Buffalo Wings',
      description: 'Spicy buffalo wings with ranch dip',
      price: '$8.99',
      category: 'Appetizers',
      status: 'Rejected',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-21',
      rating: 0,
      orders: 0,
      image: 'assets/images/buffalo-chicken.jpg',
      providerName: 'Wings World',
      providerEmail: 'wings@world.com'
    }
  ];

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.items = [...this.sampleItems];
      this.loading = false;
    }, 1000);
  }

  refreshItems(): void {
    this.loadItems();
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending Review':
        return 'warning';
      case 'Rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Approved':
        return 'pi pi-check-circle';
      case 'Pending Review':
        return 'pi pi-clock';
      case 'Rejected':
        return 'pi pi-times-circle';
      default:
        return 'pi pi-question-circle';
    }
  }

  viewItem(item: any): void {
    console.log('View item:', item);
    // Navigate to item details page or open modal
  }

  approveItem(item: any): void {
    console.log('Approve item:', item);
    item.status = 'Approved';
    // Call API to approve item
  }

  rejectItem(item: any): void {
    console.log('Reject item:', item);
    item.status = 'Rejected';
    // Call API to reject item
  }

  deleteItem(item: any): void {
    console.log('Delete item:', item);
    // Show confirmation dialog and delete item
    const index = this.items.findIndex(i => i.id === item.id);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  getTotalItems(): number {
    return this.items.length;
  }

  getApprovedItems(): number {
    return this.items.filter(item => item.status === 'Approved').length;
  }

  getPendingItems(): number {
    return this.items.filter(item => item.status === 'Pending Review').length;
  }

  getRejectedItems(): number {
    return this.items.filter(item => item.status === 'Rejected').length;
  }

  approveSelectedItems(): void {
    console.log('Approve selected items:', this.selectedItems);
    this.selectedItems.forEach(item => {
      item.status = 'Approved';
    });
    this.selectedItems = [];
  }

  rejectSelectedItems(): void {
    console.log('Reject selected items:', this.selectedItems);
    this.selectedItems.forEach(item => {
      item.status = 'Rejected';
    });
    this.selectedItems = [];
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/food.jpg';
  }
}
