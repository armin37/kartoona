import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarComponent} from '../components/messages/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {
  }

  show(message: string, actionText?: string, action?: string, duration?: number) {
    console.log(this._snackBar.openFromComponent(SnackbarComponent, {
      data: [message, actionText, action, duration],
      duration: duration ? duration : 4000,
      verticalPosition: 'top'
    }));
  }
}
