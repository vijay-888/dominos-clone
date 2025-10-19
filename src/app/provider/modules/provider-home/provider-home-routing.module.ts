import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderHomeComponent } from './provider-home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MyItemsComponent } from '../components/my-items/my-items.component';
import { AddItemsComponent } from '../components/add-items/add-items.component';
import { MenuItemDetailsComponent } from '../../../shared/components/menu-item-details/menu-item-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProviderHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'my-items', component: MyItemsComponent },
      { path: 'add-items', component: AddItemsComponent },
      { path: 'menu-item/:id', component: MenuItemDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderHomeRoutingModule { }
