import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-organisation-dialog',
  templateUrl: './add-organisation-dialog.component.html',
  styleUrls: ['./add-organisation-dialog.component.scss']
})
export class AddOrganisationDialogComponent implements OnInit {

  newOrganisationName: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor( private dialogRef: MatDialogRef<AddOrganisationDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(isSubmitted?: boolean): void {
      this.dialogRef.close(isSubmitted ? this.newOrganisationName.value : null);
  }

}
