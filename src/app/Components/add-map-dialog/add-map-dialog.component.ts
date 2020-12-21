import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import jwt_decode from 'jwt-decode';
import {ITokenModel} from '../../Models/Authentication/ITokenModel';

@Component({
  selector: 'app-add-map-dialog',
  templateUrl: './add-map-dialog.component.html',
  styleUrls: ['./add-map-dialog.component.scss']
})
export class AddMapDialogComponent implements OnInit, AfterViewInit {

  addMapFormGroup: FormGroup;
  imagePath: any;

  constructor(private dialogRef: MatDialogRef<AddMapDialogComponent>,
              private fb: FormBuilder) {
    this.addMapFormGroup = this.fb.group({
      mapNameFormControl: new FormControl('', [Validators.required]),
      capacityFormControl: new FormControl(0, [Validators.required, Validators.min(0)]),
      mapImageFormControl: new FormControl(null, [Validators.required]),
      authorizedCapacityFormControl: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)])
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      document.getElementById('drop-area')
        .addEventListener(eventName,
          (e) => { e.preventDefault(); e.stopPropagation(); },
          false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      document.getElementById('drop-area')
        .addEventListener(eventName, (e) => {
          document.getElementById('drop-area').classList.add('highlight');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      document.getElementById('drop-area')
        .addEventListener(eventName, (e) => {
          document.getElementById('drop-area').classList.remove('highlight');
        }, false);
    });

    document.getElementById('drop-area')
      .addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        ([...files as any]).forEach((file) => {
          this.addMapFormGroup.controls.mapImageFormControl.setValue(file);
          this.newImagePath(file);
        });

      } , false);

  }

  fileChange(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.addMapFormGroup.controls.mapImageFormControl.setValue(fileList[0]);
      this.newImagePath(fileList[0]);
    }
  }


  newImagePath(image: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }



  cancel(): void {
    this.dialogRef.close();
  }


  save(): void {

    if (this.addMapFormGroup.valid) {
      this.dialogRef.close({
        Name: this.addMapFormGroup.controls.mapNameFormControl.value,
        Image: this.addMapFormGroup.controls.mapImageFormControl.value,
        Capacity: this.addMapFormGroup.controls.capacityFormControl.value,
        AuthorizedCapacity: this.addMapFormGroup.controls.authorizedCapacityFormControl.value,
        OrganisationId: jwt_decode<ITokenModel>(localStorage.getItem('_token')).OrganisationId
      });
    }

  }

}
