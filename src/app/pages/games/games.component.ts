import { Component, OnInit, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { GamesListComponent } from '../../components/game/games-list/games-list.component';
import { GameService } from '../../services/game.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { GamesFormComponent } from '../../components/game/games-form/games-form.component';
import { IGame } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
export class GamesComponent implements OnInit{
  public gameService: GameService = inject(GameService);
  public modalService: NgbModal = inject(NgbModal);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.gameService.getAll();
    this.route.data.subscribe( data => {
      this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
    });
  }

  onFormEventCalled (params: IGame) {
    this.gameService.save(params);
    this.modalService.dismissAll();
  }

}
