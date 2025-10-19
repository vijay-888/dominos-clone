import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerHomeComponent } from './consumer-home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuItemDetailsComponent } from '../../../shared/components/menu-item-details/menu-item-details.component';
import { CartComponent } from '../../../shared/components/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: ConsumerHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'menu-item/:id', component: MenuItemDetailsComponent },
      { path: 'cart', component: CartComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerHomeRoutingModule { }
