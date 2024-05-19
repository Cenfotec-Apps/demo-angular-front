import { Component, ViewChild } from '@angular/core';
import { AgentGamesConfigComponent } from '../agent-games-config/agent-games-config.component';
import { ModalComponent } from '../../modal/modal.component';
import { IGame } from '../../../interfaces';

@Component({
  selector: 'app-agent-games-table',
  standalone: true,
  imports: [    
    AgentGamesConfigComponent,
    ModalComponent
  ],
  templateUrl: './agent-games-table.component.html',
  styleUrl: './agent-games-table.component.scss'
})
export class AgentGamesTableComponent {
  game: IGame = { gameName: 'test'};
  @ViewChild('configModal') configModal: any;

  showConfigModal (toConfigGame: IGame) {
    this.game = toConfigGame;
    this.configModal.show();
  }
}
