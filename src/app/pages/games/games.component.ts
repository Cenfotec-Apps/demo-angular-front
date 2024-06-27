import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { GamesListComponent } from '../../components/game/games-list/games-list.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    LoaderComponent,
    GamesListComponent
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  public gameService = inject(GameService);

  constructor() {
    this.gameService.getAll();
  }
}
