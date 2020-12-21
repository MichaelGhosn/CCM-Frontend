import { Component, OnInit } from '@angular/core';
import {ISidenavAction} from '../../Models/Sidenav/ISidenavAction';
import {Router} from '@angular/router';
import {UserService} from '../../Services/User/user.service';
import jwt_decode from 'jwt-decode';
import {ITokenModel} from '../../Models/Authentication/ITokenModel';
import {ManagementService} from '../../Services/User/management.service';
import {MatDialog} from '@angular/material/dialog';
import {AddMapDialogComponent} from '../../Components/add-map-dialog/add-map-dialog.component';
import {IAddMap} from '../../Models/Recruiter/IAddMap';
import {NotificationService} from '../../Services/Notification/notification.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  isManagement = false;

  actions: Array<ISidenavAction> = [
    {
      name: 'Logout',
      icon: 'backspace',
      class: 'actions-class',
      action: () => {
        this.router.navigate(['login']);
        localStorage.removeItem('_token');
      }
    },
  ];

  constructor(private router: Router,
              private userService: UserService,
              private managementService: ManagementService,
              private dialog: MatDialog,
              private notificationService: NotificationService) {
   this.validateIsManagement();
  }

  ngOnInit(): void {
  }


  validateIsManagement(): void {
    this.isManagement = jwt_decode<ITokenModel>(localStorage.getItem('_token')).RoleName.toLowerCase() === 'management';

    if (this.isManagement) {
      this.actions.unshift({
        name: 'Add Map',
        icon: 'add_location_alt',
        class: 'actions-class',
        action: () => {
             const addMapDialog = this.dialog.open(AddMapDialogComponent, {
               width: '60%'
             });
             addMapDialog.afterClosed().subscribe((result: IAddMap) => {
               if (result) {
                 this.managementService.AddMap(result).subscribe(response => {
                   this.notificationService.DisplaySnackBar(response.description);
                 }, error => console.error(error));
               }
             });
        }
      });
    }
  }

}
