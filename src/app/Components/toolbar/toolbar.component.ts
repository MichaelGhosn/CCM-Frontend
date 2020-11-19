import {Component, Input, OnInit} from '@angular/core';
import {NotificationService} from '../../Services/Notification/notification.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() title: string;

  constructor(public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

}
