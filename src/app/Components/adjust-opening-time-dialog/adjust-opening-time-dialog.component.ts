import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../Services/User/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IOpeningTime} from '../../Models/User/IOpeningTime';
import {forkJoin} from 'rxjs';
import {IDay} from '../../Models/User/IDay';
import {ManagementService} from '../../Services/User/management.service';
import jwt_decode from 'jwt-decode';
import {ITokenModel} from '../../Models/Authentication/ITokenModel';
import {NotificationService} from '../../Services/Notification/notification.service';

@Component({
  selector: 'app-adjust-opening-time-dialog',
  templateUrl: './adjust-opening-time-dialog.component.html',
  styleUrls: ['./adjust-opening-time-dialog.component.scss']
})
export class AdjustOpeningTimeDialogComponent implements OnInit {

  mapAvailableTimes: Array<IOpeningTime> = [];
  days: Array<IDay> = [];

  openingTimeFormGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<AdjustOpeningTimeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {mapId: number},
              private userService: UserService, private fb: FormBuilder,
              private managementService: ManagementService, private notificationService: NotificationService) {
    this.openingTimeFormGroup = this.fb.group({
      dayIdFormControl: new FormControl('', [Validators.required]),
      openingHourFormControl: new FormControl('', [Validators.required]),
      closingHourFormControl: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

    forkJoin([this.userService.GetMapOpeningTime(this.data.mapId), this.userService.GetDays()])
      .subscribe(responses => {
        this.mapAvailableTimes = responses[0].data;
        this.days = responses[1].data;
      });
  }


  save(): void {
    if (this.openingTimeFormGroup.valid) {
      this.managementService.AddOpeningTIme({
        dayId: this.openingTimeFormGroup.controls.dayIdFormControl.value,
        openingHour: this.openingTimeFormGroup.controls.openingHourFormControl.value + ':00',
        closingHour: this.openingTimeFormGroup.controls.closingHourFormControl.value + ':00',
        mapId: this.data.mapId,
      }).subscribe(response => {
        this.notificationService.DisplaySnackBar(response.description);
        this.userService.GetMapOpeningTime(this.data.mapId).subscribe(resp => {
          this.mapAvailableTimes = resp.data;
        });
      });
    }
  }

}
