import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerHomeRoutingModule } from './consumer-home-routing.module';
import { ConsumerHomeComponent } from './consumer-home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    ConsumerHomeComponent,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ConsumerHomeRoutingModule
  ]
})
export class ConsumerHomeModule { }
