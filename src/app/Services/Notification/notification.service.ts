import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  dataLoading = false;

  constructor(private snackBar: MatSnackBar) { }


  DisplaySnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

}
