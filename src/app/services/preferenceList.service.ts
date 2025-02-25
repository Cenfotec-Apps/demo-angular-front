import { Injectable, inject, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IPreferenceList, IResponse, ISearch } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PreferenceListService extends BaseService<IPreferenceList> {
  protected override source: string = 'preferenceList';
  private preferenceListSignal = signal<IPreferenceList[]>([]);
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
        this.search = {...this.search, ...response.meta};
        this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
        this.preferenceListSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }


}
