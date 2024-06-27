import { Component, Input } from '@angular/core';
import { IGame } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-games-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './games-form.component.html',
  styleUrl: './games-form.component.scss'
})
export class GamesFormComponent {
  @Input() toUpdateGame: IGame = {}
}
