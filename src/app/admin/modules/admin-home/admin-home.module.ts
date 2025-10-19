import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { AdminDashboardComponent } from '../components/dashboard/dashboard.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ManageItemsComponent } from '../components/manage-items/manage-items.component';
import { ManageRoleRequestsComponent } from '../components/manage-role-requests/manage-role-requests.component';
import { TagModule } from "primeng/tag";
import { TableModule } from "primeng/table";


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminDashboardComponent,
    SidebarComponent,
    ManageItemsComponent,
    ManageRoleRequestsComponent
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    TagModule,
    TableModule
]
})
export class AdminHomeModule { }
