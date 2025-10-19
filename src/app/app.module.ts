import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
// import { DashboardComponent } from './provider/modules/components/dashboard/dashboard.component';
// import { AddItemsComponent } from './provider/modules/components/add-items/add-items.component';
// import { MyItemsComponent } from './provider/modules/components/my-items/my-items.component';
// import { ViewItemsComponent } from './provider/modules/components/view-items/view-items.component';
// import { SidebarComponent } from './provider/modules/components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    // DashboardComponent,
    // AddItemsComponent,
    // MyItemsComponent,
    // ViewItemsComponent,
    // SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
