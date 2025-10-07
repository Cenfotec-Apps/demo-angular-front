import { inject, Injectable, signal } from '@angular/core';
import { IGift, ISearch } from '../interfaces';
import { BaseService } from './base-service';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class GiftListService extends BaseService<IGift> {
  protected override source: string = 'gift-lists';
  private giftListSignal = signal<IGift[]>([]);
  get gifts$() {
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
        next: (response: any) => {
          this.search = {...this.search, ...response.meta};
          this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
          this.giftListSignal.set(response.data);
        },
        error: (err: any) => {
          console.error('error', err);
        }
      });
    }

}
