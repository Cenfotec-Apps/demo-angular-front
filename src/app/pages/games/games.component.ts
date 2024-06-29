import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { GamesListComponent } from '../../components/game/games-list/games-list.component';
import { GameService } from '../../services/game.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { GamesFormComponent } from '../../components/game/games-form/games-form.component';
import { IGame } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    LoaderComponent,
    GamesListComponent,
    ModalComponent,
    GamesFormComponent
    ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  public gameService = inject(GameService);
  public modalService = inject(NgbModal);

  constructor() {
    this.gameService.getAll();
  }

  onFormEventCalled (params: IGame) {
    this.gameService.save(params);
    this.modalService.dismissAll();
  }

}
