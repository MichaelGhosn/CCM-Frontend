import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddOrganisationDialogComponent} from '../../Components/add-company-dialog/add-organisation-dialog.component';
import {AddUserDialogComponent} from '../../Components/add-user-dialog/add-user-dialog.component';
import {AdminService} from '../../Services/Admin/admin.service';
import {NotificationService} from '../../Services/Notification/notification.service';
import {IResponseModel} from '../../Models/IResponseModel';
import {Router} from '@angular/router';
import {IAddOrganisation} from '../../Models/Admin/IAddOrganisation';
import {forkJoin} from 'rxjs';
import {IGetOrganisations} from '../../Models/Admin/IGetOrganisations';
import {IGetRoles} from '../../Models/Admin/IGetRoles';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

  actions = [
    {
      name: 'Add Organisation',
      icon: 'add_location_alt',
      class: 'actions-class',
      action: () => {
        const addOrganisationDialog = this.dialog.open(AddOrganisationDialogComponent, {
          width: '40%'
        });
        addOrganisationDialog.afterClosed().subscribe((result: IAddOrganisation) => {
           if (result) {
             this.adminService.AddOrganisation(result).subscribe((response: IResponseModel<string>) => {
               this.notificationService.DisplaySnackBar(response.description);
             }, error => console.error(error));
           }
        });
      }
    },
    {
      name: 'Add User',
      icon: 'group_add',
      class: 'actions-class',
      action: () => {

        forkJoin([this.adminService.GetOrganisations(), this.adminService.GetRoles()])
          .subscribe( (results: [IResponseModel<Array<IGetOrganisations>>, IResponseModel<Array<IGetRoles>>]) => {
            const addUserDialog = this.dialog.open(AddUserDialogComponent, {
              width: '60%',
              data: results.map(x => x.data)
            });
          });
      }
    },
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

  constructor(private dialog: MatDialog,
              private adminService: AdminService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit(): void {
  }

}
