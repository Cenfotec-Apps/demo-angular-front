import { Injectable, inject, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IPreferenceList, IResponse, ISearch } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class PreferenceListService extends BaseService<IPreferenceList> {
  private preferenceListSignal = signal<IPreferenceList[]>([]);
  private alertService: AlertService = inject(AlertService);
  protected override source: string = 'preferenceList';
  get prefencelist$() {
    return this.preferenceListSignal;
  }
  public search: ISearch = {
    page: 1,
    size: 5
  }
  public totalItems: any = [];


  getAll() {
    this.findAllWithParams(this.search).subscribe({
      next: (response: IResponse<IPreferenceList[]>) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
        this.preferenceListSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  save(item: IPreferenceList) {
    this.add(item).subscribe({
      next: (response: IResponse<IPreferenceList>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the preference list', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(item: IPreferenceList) {
    this.editCustomSource('', item).subscribe({
      next: (response: IResponse<IPreferenceList>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the order', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(item: IPreferenceList) {
    this.del(item.id).subscribe({
      next: (response: IResponse<IPreferenceList>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the order', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

}
