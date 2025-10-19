import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './auth/components/login/login.component';
// import { RegisterComponent } from './auth/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/module/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'consumer',
    loadChildren: () =>
      import('./consumer/modules/consumer-home/consumer-home.module').then(m => m.ConsumerHomeModule)
  },
  {
    path: 'provider',
    loadChildren: () =>
      import('./provider/modules/provider-home/provider-home.module').then(m => m.ProviderHomeModule)
  },
  // { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
