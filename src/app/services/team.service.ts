import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IResponse, ISearch, ISportTeam } from '../interfaces';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends BaseService<ISportTeam> {
  protected override source: string = 'teams';
  private teamListSignal = signal<ISportTeam[]>([]);
  get teams$() {
    return this.teamListSignal;
  }
  public search: ISearch = { 
    page: 1,
    size: 5
  }

  public totalItems: any = [];
  private alertService: AlertService = inject(AlertService);

  getAll () {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (response: IResponse<ISportTeam[]>) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
        this.teamListSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  save(item: ISportTeam) {
    this.add(item).subscribe({
      next: (response: IResponse<ISportTeam>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the team', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(item: ISportTeam) {
    this.edit(item.id, item).subscribe({
      next: (response: IResponse<ISportTeam>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the team', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(item: ISportTeam) {
    this.del(item.id).subscribe({
      next: (response: IResponse<ISportTeam>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the team', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }
  

}