import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerHomeComponent } from './consumer-home.component';
import { MenuItemDetailsComponent } from '../../../shared/components/menu-item-details/menu-item-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ConsumerHomeComponent },
  { path: 'menu-item/:id', component: MenuItemDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerHomeRoutingModule { }
