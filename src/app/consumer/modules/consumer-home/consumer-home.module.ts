import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

import { ConsumerHomeRoutingModule } from './consumer-home-routing.module';
import { ConsumerHomeComponent } from './consumer-home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MenuItemsComponent } from '../../../shared/components/menu-items/menu-items.component';
import { MenuItemDetailsComponent } from '../../../shared/components/menu-item-details/menu-item-details.component';
import { CartComponent } from '../../../shared/components/cart/cart.component';
// import { HeaderComponent } from '../../../shared/components/header/header.component';

@NgModule({
  declarations: [
    ConsumerHomeComponent,
    DashboardComponent,
    FavoritesComponent,
    MenuItemsComponent,
    MenuItemDetailsComponent,
    CartComponent,
    // HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ConsumerHomeRoutingModule,
    CardModule
  ],
  exports: [
    MenuItemsComponent,
    MenuItemDetailsComponent
  ]
})
export class ConsumerHomeModule { }
