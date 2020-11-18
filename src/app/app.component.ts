import { Component } from '@angular/core';
import {NotificationService} from './Services/Notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public notificationService: NotificationService) {}


  title = 'CCM-Frontend';
}
