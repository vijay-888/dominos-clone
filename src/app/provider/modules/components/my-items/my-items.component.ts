import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html',
  styleUrls: ['./my-items.component.scss']
})
export class MyItemsComponent implements OnInit {
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
      status: 'Published',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      rating: 4.5,
      orders: 45,
      image: 'assets/images/margarita.jpg'
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      description: 'Delicious pizza topped with spicy pepperoni and cheese',
      price: '$14.99',
      category: 'Non Veg Pizza',
      status: 'Published',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      rating: 4.7,
      orders: 78,
      image: 'assets/images/pepironi.jpg'
    },
    {
      id: 3,
      name: 'BBQ Chicken Pizza',
      description: 'Grilled chicken with BBQ sauce, onions, and mozzarella',
      price: '$16.99',
      category: 'Non Veg Pizza',
      status: 'Pending Approval',
      createdAt: '2024-01-22',
      updatedAt: '2024-01-22',
      rating: 0,
      orders: 0,
      image: 'assets/images/bbq-chicken.jpg'
    },
    {
      id: 4,
      name: 'Garlic Bread',
      description: 'Crispy bread with garlic butter and herbs',
      price: '$4.99',
      category: 'Sides',
      status: 'Published',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-15',
      rating: 4.4,
      orders: 32,
      image: 'assets/images/garic-bread.jpg'
    },
    {
      id: 5,
      name: 'Hawaiian Pizza',
      description: 'Ham, pineapple, and cheese on a thin crust',
      price: '$15.99',
      category: 'Non Veg Pizza',
      status: 'Draft',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-25',
      rating: 0,
      orders: 0,
      image: 'assets/images/hawalian.jpg'
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

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'Published':
        return 'success';
      case 'Pending Approval':
        return 'warning';
      case 'Draft':
        return 'info';
      case 'Rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Published':
        return 'pi pi-check-circle';
      case 'Pending Approval':
        return 'pi pi-clock';
      case 'Draft':
        return 'pi pi-file-edit';
      case 'Rejected':
        return 'pi pi-times-circle';
      default:
        return 'pi pi-question-circle';
    }
  }

  editItem(item: any): void {
    console.log('Edit item:', item);
    // Navigate to edit page or open edit modal
  }

  deleteItem(item: any): void {
    console.log('Delete item:', item);
    // Show confirmation dialog and delete item
  }

  viewItem(item: any): void {
    console.log('View item:', item);
    // Navigate to item details page
  }

  duplicateItem(item: any): void {
    console.log('Duplicate item:', item);
    // Create a copy of the item for editing
  }

  getTotalItems(): number {
    return this.items.length;
  }

  getPublishedItems(): number {
    return this.items.filter(item => item.status === 'Published').length;
  }

  getPendingItems(): number {
    return this.items.filter(item => item.status === 'Pending Approval').length;
  }

  getDraftItems(): number {
    return this.items.filter(item => item.status === 'Draft').length;
  }

  deleteSelectedItems(): void {
    console.log('Delete selected items:', this.selectedItems);
    // Show confirmation dialog and delete selected items
    this.selectedItems = [];
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/food.jpg';
  }
}
