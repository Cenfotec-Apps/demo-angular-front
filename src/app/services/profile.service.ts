import { Injectable, inject, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IUser } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService<IUser> {
  protected override source: string = 'users/me';
  private userSignal = signal<IUser>({});
  private snackBar = inject(MatSnackBar);

  get user$() {
    return  this.userSignal;
  }

  getUserInfoSignal() {
    this.findAll().subscribe({
      next: (response: any) =>{
        console.log('response', response);
        this.userSignal.set();
      },
      error: (error: any) => {
        this.snackBar.open(
          `Error getting user profile info ${error.message}`,
           'Close', 
          {
            horizontalPosition: 'right', 
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          }
        )
      }
    })
    console.log('after  getUserInfoSignal');
  }

}
