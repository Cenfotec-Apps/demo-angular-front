import { Injectable, signal } from '@angular/core';
import { IGame } from '../interfaces';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService<IGame>{
  protected override  source: string = 'games';
  private itemListSignal = signal<IGame[]>([]);

  get items$ () {
    return this.itemListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        console.log('response',response);
        this.itemListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error in get all games request', error);
      }
    })
  }

}