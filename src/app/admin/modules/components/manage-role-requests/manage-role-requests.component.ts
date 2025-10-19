import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-role-requests',
  templateUrl: './manage-role-requests.component.html',
  styleUrls: ['./manage-role-requests.component.scss']
})
export class ManageRoleRequestsComponent implements OnInit {
  requests: any[] = [];
  loading = false;
  selectedRequests: any[] = [];

  // Sample data - in real app, this would come from API
  sampleRequests = [
    {
      id: 1,
      userName: 'John Smith',
      userEmail: 'john.smith@email.com',
      currentRole: 'Consumer',
      requestedRole: 'Provider',
      reason: 'I want to start selling my homemade pizzas and expand my business.',
      status: 'Pending',
      requestedDate: '2024-01-20',
      reviewedBy: null,
      reviewedDate: null
    },
    {
      id: 2,
      userName: 'Sarah Johnson',
      userEmail: 'sarah.j@email.com',
      currentRole: 'Consumer',
      requestedRole: 'Provider',
      reason: 'I have a food truck and would like to list my items on the platform.',
      status: 'Approved',
      requestedDate: '2024-01-18',
      reviewedBy: 'Admin User',
      reviewedDate: '2024-01-19'
    },
    {
      id: 3,
      userName: 'Mike Wilson',
      userEmail: 'mike.wilson@email.com',
      currentRole: 'Provider',
      requestedRole: 'Consumer',
      reason: 'I want to simplify my account and focus only on ordering food.',
      status: 'Pending',
      requestedDate: '2024-01-22',
      reviewedBy: null,
      reviewedDate: null
    },
    {
      id: 4,
      userName: 'Emily Davis',
      userEmail: 'emily.davis@email.com',
      currentRole: 'Consumer',
      requestedRole: 'Provider',
      reason: 'I run a bakery and would like to offer my products through this platform.',
      status: 'Rejected',
      requestedDate: '2024-01-15',
      reviewedBy: 'Admin User',
      reviewedDate: '2024-01-16'
    },
    {
      id: 5,
      userName: 'David Brown',
      userEmail: 'david.brown@email.com',
      currentRole: 'Consumer',
      requestedRole: 'Provider',
      reason: 'I have a restaurant and want to increase my online presence.',
      status: 'Pending',
      requestedDate: '2024-01-25',
      reviewedBy: null,
      reviewedDate: null
    },
    {
      id: 6,
      userName: 'Lisa Anderson',
      userEmail: 'lisa.anderson@email.com',
      currentRole: 'Provider',
      requestedRole: 'Consumer',
      reason: 'I am closing my business and want to switch to consumer account.',
      status: 'Approved',
      requestedDate: '2024-01-12',
      reviewedBy: 'Admin User',
      reviewedDate: '2024-01-13'
    }
  ];

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.requests = [...this.sampleRequests];
      this.loading = false;
    }, 1000);
  }

  refreshRequests(): void {
    this.loadRequests();
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
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
      case 'Pending':
        return 'pi pi-clock';
      case 'Rejected':
        return 'pi pi-times-circle';
      default:
        return 'pi pi-question-circle';
    }
  }

  viewRequest(request: any): void {
    console.log('View request:', request);
    // Navigate to request details page or open modal
  }

  approveRequest(request: any): void {
    console.log('Approve request:', request);
    request.status = 'Approved';
    request.reviewedBy = 'Current Admin';
    request.reviewedDate = new Date().toISOString().split('T')[0];
    // Call API to approve request
  }

  rejectRequest(request: any): void {
    console.log('Reject request:', request);
    request.status = 'Rejected';
    request.reviewedBy = 'Current Admin';
    request.reviewedDate = new Date().toISOString().split('T')[0];
    // Call API to reject request
  }

  deleteRequest(request: any): void {
    console.log('Delete request:', request);
    // Show confirmation dialog and delete request
    const index = this.requests.findIndex(r => r.id === request.id);
    if (index > -1) {
      this.requests.splice(index, 1);
    }
  }

  getTotalRequests(): number {
    return this.requests.length;
  }

  getPendingRequests(): number {
    return this.requests.filter(request => request.status === 'Pending').length;
  }

  getApprovedRequests(): number {
    return this.requests.filter(request => request.status === 'Approved').length;
  }

  getRejectedRequests(): number {
    return this.requests.filter(request => request.status === 'Rejected').length;
  }

  approveSelectedRequests(): void {
    console.log('Approve selected requests:', this.selectedRequests);
    this.selectedRequests.forEach(request => {
      request.status = 'Approved';
      request.reviewedBy = 'Current Admin';
      request.reviewedDate = new Date().toISOString().split('T')[0];
    });
    this.selectedRequests = [];
  }

  rejectSelectedRequests(): void {
    console.log('Reject selected requests:', this.selectedRequests);
    this.selectedRequests.forEach(request => {
      request.status = 'Rejected';
      request.reviewedBy = 'Current Admin';
      request.reviewedDate = new Date().toISOString().split('T')[0];
    });
    this.selectedRequests = [];
  }
}
