import { Component, OnInit } from '@angular/core';
import {ISidenavAction} from '../../Models/Sidenav/ISidenavAction';
import {Router} from '@angular/router';
import {UserService} from '../../Services/User/user.service';
import jwt_decode from 'jwt-decode';
import {ITokenModel} from '../../Models/Authentication/ITokenModel';
import {ManagementService} from '../../Services/User/management.service';
import {MatDialog} from '@angular/material/dialog';
import {AddMapDialogComponent} from '../../Components/add-map-dialog/add-map-dialog.component';
import {IAddMap} from '../../Models/Management/IAddMap';
import {NotificationService} from '../../Services/Notification/notification.service';
import {IMap} from '../../Models/User/IMap';
import {environment} from '../../../environments/environment';
import {ViewMapDialogComponent} from '../../Components/view-map-dialog/view-map-dialog.component';
import {AdjustOpeningTimeDialogComponent} from '../../Components/adjust-opening-time-dialog/adjust-opening-time-dialog.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  isManagement = false;

  maps: Array<IMap> = [];

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

   this.fetchMaps();
  }

  ngOnInit(): void {
  }

  fetchMaps(): void {
    this.userService.GetMapsOfOrganisation(jwt_decode<ITokenModel>(localStorage.getItem('_token')).OrganisationId)
      .subscribe(response => {
        this.maps = response.data.map(map => {
          return {
            ...map,
            image: environment.backendUrl + '/images/maps/' + map.image
          };
        });
        this.notificationService.DisplaySnackBar(response.description);
      });
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

                   const seats = [];
                   for (let i = 1; i <= result.Capacity ; i++) {
                     seats.push({
                       mapId: response.data.mapId,
                       name: 'Seat ' + i
                     });
                   }

                   this.managementService.AddSeats(seats).subscribe();

                   this.fetchMaps();
                 }, error => console.error(error));
               }
             });
        }
      });
    }
  }

  viewMap(mapId: number): void {
    const viewMapDialog = this.dialog.open(ViewMapDialogComponent, {
      width: '100%',
      data: {
        mapId
      }
    });

    viewMapDialog.afterClosed().subscribe(result => {
      if (result) {
        this.userService.AddReservation(result).subscribe(response => {
          this.notificationService.DisplaySnackBar(response.description);
        });
      }
    });
  }

  adjustOpeningTime(mapId: number): void {
    const openingTimeDialog = this.dialog.open(AdjustOpeningTimeDialogComponent, {
      width: '100%',
      data: {
        mapId
      }
    });
  }

}
