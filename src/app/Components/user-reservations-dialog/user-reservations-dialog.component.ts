import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {IPagination} from '../../Models/IPagination';
import {UserService} from '../../Services/User/user.service';
import jwt_decode from 'jwt-decode';
import {ITokenModel} from '../../Models/Authentication/ITokenModel';
import {IReservation} from '../../Models/User/IReservation';
import {NotificationService} from '../../Services/Notification/notification.service';

@Component({
  selector: 'app-user-reservations-dialog',
  templateUrl: './user-reservations-dialog.component.html',
  styleUrls: ['./user-reservations-dialog.component.scss']
})
export class UserReservationsDialogComponent implements OnInit {

  reservations: Array<IReservation> = [];

  pagination: IPagination = {
    pageNumber: 0,
    pageSize: 10,
    totalItemCount: 0
  };

  pageSizeOptions = [1, 3, 5, 10];

  isDeletingId = null;

  constructor(private dialogRef: MatDialogRef<UserReservationsDialogComponent>,
              private userService: UserService,
              private notificationService: NotificationService) {

    this.getReservations();

  }

  ngOnInit(): void {
  }

  getReservations(): void {
    this.userService.GetReservationsHistory(jwt_decode<ITokenModel>(localStorage.getItem('_token')).UserId, this.pagination)
      .subscribe(response => {
        this.reservations = response.data.reservations;
        this.pagination.pageNumber = response.data.pageNumber;
        this.pagination.pageSize = response.data.pageSize;
        this.pagination.totalItemCount = response.data.totalItemCount;
      });
  }

  displayedColumns = () => {
    if (!(this.reservations && this.reservations.length)) {
      return [];
    }

    let cols = Object.keys(this.reservations[0]);
    cols = cols.filter(x => !x.toLowerCase().includes('id'));
    cols.push('delete');
    return cols;
  }

  pageChanged(event: any): void {
    this.pagination.totalItemCount = event.length;
    this.pagination.pageNumber = event.pageIndex;
    this.pagination.pageSize = event.pageSize;

    this.getReservations();
  }


  deleteReservation(reservationId: number): void {

    this.userService.DeleteReservation(reservationId).subscribe(response => {
      this.notificationService.DisplaySnackBar(response.description);

      if (response.success) {
        this.getReservations();
        this.isDeletingId = null;
      }

    });

  }

}
