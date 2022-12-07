import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SnackbarComponent],
  exports: [SnackbarComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    RouterModule
  ]
})
export class MessagesModule { }
