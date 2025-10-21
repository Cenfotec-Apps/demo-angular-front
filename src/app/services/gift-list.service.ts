import { inject, Injectable, signal } from '@angular/core';
import { IGiftList, IResponse, ISearch } from '../interfaces';
import { BaseService } from './base-service';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class GiftListService extends BaseService<IGiftList> {
  protected override source: string = 'gift-lists';
  private giftListSignal = signal<IGiftList[]>([]);
  get giftsLists$() {
    return this.giftListSignal;
  }
    public search: ISearch = { 
      page: 1,
      size: 5
    }
    public totalItems: any = [];
    private authService: AuthService = inject(AuthService);
    private alertService: AlertService = inject(AlertService);

    getAll() {
      this.findAllWithParams({ page: this.search.page, size: this.search.size}).subscribe({
        next: (response: IResponse<IGiftList[]>) => {
          this.search = {...this.search, ...response.meta};
          this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
          this.giftListSignal.set(response.data);
        },
        error: (err: any) => {
          console.error('error', err);
        }
      });
    }

    save(item: IGiftList) {
      this.add(item).subscribe({
        next: (response: IResponse<IGiftList>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'An error occurred adding the gift list','center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }

    update(item: IGiftList) {
      this.customEdit(item).subscribe({
        next: (response: IResponse<IGiftList>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'An error occurred updating the gift list','center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }

    delete(item: IGiftList) {
      this.del(item.id).subscribe({
        next: (response: IResponse<IGiftList>) => {
          this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
          this.getAll();
        },
        error: (err: any) => {
          this.alertService.displayAlert('error', 'An error occurred deleting the gift list', 'center', 'top', ['error-snackbar']);
          console.error('error', err);
        }
      });
    }
}
