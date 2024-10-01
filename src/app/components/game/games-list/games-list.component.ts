import { GameService } from './../../../services/game.service';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { IAuthority, IGame } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { GamesFormComponent } from '../games-form/games-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    GamesFormComponent,
    PickerComponent
  ],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent implements OnChanges{
  @Input() itemList: IGame[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: IGame = {};
  private gameService = inject(GameService);
  public modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

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
