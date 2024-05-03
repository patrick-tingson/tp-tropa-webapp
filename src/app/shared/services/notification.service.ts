import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(private snackBar: MatSnackBar) { }

  openSnackBarErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: 'error-snackbar',
    });
  }

  openSnackBarError(error: any) {
    let errorMessage = `${error.status}: ${error.error?.description}`;
    if(error.status === 0) {
      errorMessage = "Can't connect to the server. Please try again later.";
    } else if (error.status === 401) {
      errorMessage = "Unauthorized";
    } else if (error.status === 404) {
      errorMessage = "Group id does not exist.";
    }
    this.snackBar.open(errorMessage, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: 'error-snackbar',
    });
  }

  openSnackBarSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: 'success-snackbar',
    });
  }
}
