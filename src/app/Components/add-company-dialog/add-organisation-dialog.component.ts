import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-organisation-dialog',
  templateUrl: './add-organisation-dialog.component.html',
  styleUrls: ['./add-organisation-dialog.component.scss']
})
export class AddOrganisationDialogComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<AddOrganisationDialogComponent>) { }

  ngOnInit(): void {
  }

}
