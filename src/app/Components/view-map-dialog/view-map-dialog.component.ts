import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../Services/User/user.service';
import {IOpeningTime} from '../../Models/User/IOpeningTime';
import {ISeat} from '../../Models/User/ISeat';
import {forkJoin} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import jwt_decode from 'jwt-decode';
import {ITokenModel} from '../../Models/Authentication/ITokenModel';

@Component({
  selector: 'app-view-map-dialog',
  templateUrl: './view-map-dialog.component.html',
  styleUrls: ['./view-map-dialog.component.scss']
})
export class ViewMapDialogComponent implements OnInit {

  mapAvailableTimes: Array<IOpeningTime> = [];
  mapAvailableSeats: Array<ISeat> = [];

  addReservationFormGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<ViewMapDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {mapId: number},
              private userService: UserService, private fb: FormBuilder) {

    this.addReservationFormGroup = this.fb.group({
        seatIdFormControl: new FormControl('', [Validators.required]),
        reservationDateFormControl: new FormControl('', [Validators.required]),
        startHourFormControl: new FormControl('', [Validators.required]),
        endHourFormControl: new FormControl('', [Validators.required]),
    });

    forkJoin([this.userService.GetMapOpeningTime(this.data.mapId),
      this.userService.GetMapSeats(this.data.mapId)]).subscribe(responses => {
        this.mapAvailableTimes = responses[0].data;
        this.mapAvailableSeats = responses[1].data;
    });

  }

  ngOnInit(): void {
  }

  save(): void {

    if (this.addReservationFormGroup.valid) {


      // months are counted from 0 -> 11
      let date = this.addReservationFormGroup.controls.reservationDateFormControl.value.getFullYear()
        + '-' + (this.addReservationFormGroup.controls.reservationDateFormControl.value.getMonth() < 10 ?
          0 + '' + (this.addReservationFormGroup.controls.reservationDateFormControl.value.getMonth() + 1)
          : (this.addReservationFormGroup.controls.reservationDateFormControl.value.getMonth() + 1))
        + '-' + (this.addReservationFormGroup.controls.reservationDateFormControl.value.getDate() < 10 ?
          0 + '' + this.addReservationFormGroup.controls.reservationDateFormControl.value.getDate()
          : this.addReservationFormGroup.controls.reservationDateFormControl.value.getDate())
        + 'T';

      const start = date + this.addReservationFormGroup.controls.startHourFormControl.value + ':00';
      const end = date + this.addReservationFormGroup.controls.endHourFormControl.value + ':00';
      date = date + '00:00:00';

      this.dialogRef.close({
        userId: Number(jwt_decode<ITokenModel>(localStorage.getItem('_token')).UserId),
        seatId: this.addReservationFormGroup.controls.seatIdFormControl.value,
        reservationDate: date,
        startHour: start,
        endHour: end
      });
    }
  }

}
