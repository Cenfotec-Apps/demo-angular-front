import { GameService } from './../../../services/game.service';
import { Component, Input, inject } from '@angular/core';
import { IGame } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { GamesFormComponent } from '../games-form/games-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  private gameService = inject(GameService);
  public modalService = inject(NgbModal);

  showDetailModal(item: IGame, modal:any) {
    this.selectedItem = {...item};
    modal.show(); 
  }

  onFormEventCalled (params: IGame) {
    this.gameService.update(params);
    this.modalService.dismissAll();
  }

  deleteGame(game: IGame) {
    this.gameService.delete(game);
  }
}
