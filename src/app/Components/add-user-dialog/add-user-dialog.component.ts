import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IGetOrganisation} from '../../Models/Admin/IGetOrganisation';
import {IGetRole} from '../../Models/Admin/IGetRole';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

  addUserFormGroup: FormGroup;

  hidePassword = true;

  constructor(private dialogRef: MatDialogRef<AddUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [Array<IGetOrganisation>, Array<IGetRole>],
              private fb: FormBuilder) {
    this.addUserFormGroup = this.fb.group({
      firstNameFormControl: new FormControl('', [Validators.required]),
      lastNameFormControl: new FormControl('', [Validators.required]),
      emailFormControl: new FormControl('', [Validators.required]),
      passwordFormControl: new FormControl('', [Validators.required]),
      roleIdFormControl: new FormControl('', [Validators.required]),
      organisationIdFormControl: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  cancel(): void {
    this.dialogRef.close();
  }


  save(): void {

    if (this.addUserFormGroup.valid) {
      this.dialogRef.close({
        firstName: this.addUserFormGroup.controls.firstNameFormControl.value,
        lastName: this.addUserFormGroup.controls.lastNameFormControl.value,
        email: this.addUserFormGroup.controls.emailFormControl.value,
        password: this.addUserFormGroup.controls.passwordFormControl.value,
        roleId: this.addUserFormGroup.controls.roleIdFormControl.value,
        organisationId: this.addUserFormGroup.controls.organisationIdFormControl.value,
      });
    }

  }
}
