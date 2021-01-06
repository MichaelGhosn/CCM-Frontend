import {Component, Input, OnInit} from '@angular/core';
import {ISidenavAction} from '../../Models/Sidenav/ISidenavAction';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() actions: Array<ISidenavAction>;

  constructor() { }

  ngOnInit(): void {
  }

}
