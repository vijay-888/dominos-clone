import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

import { ConsumerHomeRoutingModule } from './consumer-home-routing.module';
import { ConsumerHomeComponent } from './consumer-home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuItemsComponent } from '../../../shared/components/menu-items/menu-items.component';
import { MenuItemDetailsComponent } from '../../../shared/components/menu-item-details/menu-item-details.component';

@NgModule({
  declarations: [
    ConsumerHomeComponent,
    SidebarComponent,
    DashboardComponent,
    MenuItemsComponent,
    MenuItemDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ConsumerHomeRoutingModule,
    CardModule
  ]
})
export class ConsumerHomeModule { }
