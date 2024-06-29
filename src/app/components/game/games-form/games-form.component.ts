import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() title: string = '';
  @Input() toUpdateGame: IGame = {};
  @Output() callParentEvent: EventEmitter<IGame> = new EventEmitter<IGame>();

  addEdit()  {
    this.callParentEvent.emit(this.toUpdateGame);
  }

}
