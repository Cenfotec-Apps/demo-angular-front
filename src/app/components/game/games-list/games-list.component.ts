import { Component, Input } from '@angular/core';
import { IGame } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { GamesFormComponent } from '../games-form/games-form.component';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    GamesFormComponent
  ],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent {
  @Input() itemList: IGame[] = [];
  public selectedItem: IGame = {};

  showDetailModal(item: IGame, modal:any) {
    this.selectedItem = {...item};
    modal.show(); 
  }
}
