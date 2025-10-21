import { inject, Injectable, signal } from '@angular/core';
import { IGift, IResponse, ISearch } from '../interfaces';
import { BaseService } from './base-service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class GiftService extends BaseService<IGift> {
  protected override source: string = 'gifts';
  private giftSignal = signal<IGift[]>([]);
  
  get gifts$() {
    return this.giftSignal;
  }

  public search: ISearch = { 
    page: 1,
    size: 10
  }
  
  public totalItems: any = [];
  private alertService: AlertService = inject(AlertService);

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size}).subscribe({
      next: (response: IResponse<IGift[]>) => {
        this.search = {...this.search, ...response.meta};
        this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
        this.giftSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  getGiftsByGiftListId(giftListId: number) {
    this.findAllWithParamsAndCustomSource(`gift-list/${giftListId}`, { page: this.search.page, size: this.search.size}).subscribe({
      next: (response: IResponse<IGift[]>) => {
        this.search = {...this.search, ...response.meta};
        this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
        this.giftSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  addGiftToGiftList(giftListId: number, gift: IGift) {
    this.addCustomSource(`../gift-lists/${giftListId}/gifts`, gift).subscribe({
      next: (response: IResponse<IGift>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the gift','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  save(item: IGift) {
    this.add(item).subscribe({
      next: (response: IResponse<IGift>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the gift','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(item: IGift) {
    this.edit(item.id, item).subscribe({
      next: (response: IResponse<IGift>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the gift','center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(item: IGift) {
    this.del(item.id).subscribe({
      next: (response: IResponse<IGift>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the gift', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  deleteGiftFromGiftList(giftListId: number, giftId: number) {
    this.delCustomSource(`../gift-lists/${giftListId}/gifts/${giftId}`).subscribe({
      next: (response: IResponse<IGift>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getGiftsByGiftListId(giftListId);
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the gift', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }
}
