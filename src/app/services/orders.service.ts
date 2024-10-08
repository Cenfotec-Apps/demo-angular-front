import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IOrder, ISearch } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService<IOrder> {
  protected override source: string = 'orders';
  private orderListSignal = signal<IOrder[]>([]);
  get orders$() {
    return this.orderListSignal;
  }
  public search: ISearch = { 
    page: 1,
    size: 5
  }
  public totalItems: any = [];

  getAll() {
    this.findAllWithParams(this.search).subscribe({
      next: (response: any) => {
        this.search = {...this.search, ...response.meta};
        this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
        this.orderListSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

}
