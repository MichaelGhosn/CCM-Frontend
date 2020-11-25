import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IGetOrganisations} from '../../Models/Admin/IGetOrganisations';
import {IGetRoles} from '../../Models/Admin/IGetRoles';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [Array<IGetOrganisations>, Array<IGetRoles>]) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
