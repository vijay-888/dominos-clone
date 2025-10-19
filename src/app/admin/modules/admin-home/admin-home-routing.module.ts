import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../components/dashboard/dashboard.component';
import { ManageItemsComponent } from '../components/manage-items/manage-items.component';
import { ManageRoleRequestsComponent } from '../components/manage-role-requests/manage-role-requests.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'manage-items',
    component: ManageItemsComponent
  },
  {
    path: 'role-requests',
    component: ManageRoleRequestsComponent
  },
  {
    path: 'manage-users',
    component: AdminDashboardComponent // Placeholder - will be replaced with actual component
  },
  {
    path: 'orders',
    component: AdminDashboardComponent // Placeholder - will be replaced with actual component
  },
  {
    path: 'analytics',
    component: AdminDashboardComponent // Placeholder - will be replaced with actual component
  },
  {
    path: 'settings',
    component: AdminDashboardComponent // Placeholder - will be replaced with actual component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRoutingModule { }
