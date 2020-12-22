import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddOrganisationDialogComponent} from '../../Components/add-organisation-dialog/add-organisation-dialog.component';
import {AddUserDialogComponent} from '../../Components/add-user-dialog/add-user-dialog.component';
import {AdminService} from '../../Services/Admin/admin.service';
import {NotificationService} from '../../Services/Notification/notification.service';
import {IResponseModel} from '../../Models/IResponseModel';
import {Router} from '@angular/router';
import {IAddOrganisation} from '../../Models/Admin/IAddOrganisation';
import {forkJoin} from 'rxjs';
import {IGetOrganisation} from '../../Models/Admin/IGetOrganisation';
import {IGetRole} from '../../Models/Admin/IGetRole';
import {IAddUser} from '../../Models/Admin/IAddUser';
import {ISidenavAction} from '../../Models/Sidenav/ISidenavAction';
import {IGetUser} from '../../Models/Admin/IGetUser';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

  actions: Array<ISidenavAction> = [
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
          .subscribe( (results: [IResponseModel<Array<IGetOrganisation>>, IResponseModel<Array<IGetRole>>]) => {
            const addUserDialog = this.dialog.open(AddUserDialogComponent, {
              width: '60%',
              data: results.map(x => x.data)
            });
            addUserDialog.afterClosed().subscribe((result: IAddUser) => {
              if (result) {
                this.adminService.AddUser(result).subscribe((response: IResponseModel<string>) => {
                  this.notificationService.DisplaySnackBar(response.description);
                  this.getUsers();
                }, error => console.error(error));
              }
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


  users = [];
  isDeletingId = null;

  constructor(private dialog: MatDialog,
              private adminService: AdminService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }



  getUsers(): void {
    this.adminService.GetUsers().subscribe(response => {
      this.users = response.data.map(item => {
          return {
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            roleName: item.role.name,
            organisationName: item.organisation.name
          };
      });
    });
  }

  displayedColumns = () => {
    if (!(this.users && this.users.length)) {
      return [];
    }

    let cols = Object.keys(this.users[0]);
    cols = cols.filter(x => !x.toLowerCase().includes('id'));
    cols.push('delete');
    return cols;
  }


  deleteUser(userId): void {
    this.adminService.DeleteUser(userId).subscribe(response => {
      this.notificationService.DisplaySnackBar(response.description);
      this.getUsers();
    });
  }

}
