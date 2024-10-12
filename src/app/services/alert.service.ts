import { inject, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})

export class AlertService {
  private snackBar = inject(MatSnackBar);
  displayAlert(type: string, message: string, horizontalPosition?: MatSnackBarHorizontalPosition, verticalPosition?: MatSnackBarVerticalPosition, panelClass?: string[]) {
    let finalMessage = !message && type == 'error' ? 'An error occurred, please try again later' : !message && type == 'success' ? 'Success' : message 
    this.snackBar.open(finalMessage, 'Cerrar', {
      horizontalPosition: horizontalPosition ?? 'center',
      verticalPosition: verticalPosition ?? 'top',
      panelClass: panelClass ?? ['error-snackbar'],
      duration: 3000
    });
  }

}