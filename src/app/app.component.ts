import { Component, OnInit } from '@angular/core';
import { BodyPaddingService } from './shared/services/body-padding.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private bodyPaddingService: BodyPaddingService) { }

  ngOnInit(): void {
    // Service will automatically handle route changes
  }
}
