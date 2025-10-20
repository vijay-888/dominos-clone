import { Component } from '@angular/core';

@Component({
  selector: 'app-provider-home',
  templateUrl: './provider-home.component.html',
  styleUrls: ['./provider-home.component.scss']
})
export class ProviderHomeComponent {
  isSidebarCollapsed = true;

  onCollapsedChange(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
