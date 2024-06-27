import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IGame } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService<IGame>{
  protected override source: string = 'games';
  private itemListSignal = signal<IGame[]>([]);

  get items$() {
    return this.itemListSignal
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        this.itemListSignal.set(response);
      },
      error: (error : any) => {
        console.log('error', error);
      }
    });
  }

}
