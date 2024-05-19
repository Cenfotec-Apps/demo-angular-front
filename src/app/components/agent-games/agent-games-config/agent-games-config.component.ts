import { Component, Input, OnInit } from '@angular/core';
import { IGame } from '../../../interfaces';

@Component({
  selector: 'app-agent-games-config',
  standalone: true,
  imports: [],
  templateUrl: './agent-games-config.component.html',
  styleUrl: './agent-games-config.component.scss'
})
export class AgentGamesConfigComponent implements OnInit{
  @Input() data!: IGame;
  ngOnInit(): void {
    console.log('game', this.data);
  }
}
