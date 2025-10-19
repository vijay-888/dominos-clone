import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { ProviderHomeRoutingModule } from './provider-home-routing.module';
import { ProviderHomeComponent } from './provider-home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { MyItemsComponent } from '../components/my-items/my-items.component';
import { AddItemsComponent } from '../components/add-items/add-items.component';
import { ConsumerHomeModule } from 'src/app/consumer/modules/consumer-home/consumer-home.module';

@NgModule({
  declarations: [
    ProviderHomeComponent,
    DashboardComponent,
    SidebarComponent,
    MyItemsComponent,
    AddItemsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    TagModule,
    TooltipModule,
    ProviderHomeRoutingModule,
    ConsumerHomeModule
  ],
  providers: [DatePipe]
})
export class ProviderHomeModule { }
