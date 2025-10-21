import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGift } from '../../../interfaces';

@Component({
  selector: 'app-gifts-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gifts-table.component.html',
  styleUrl: './gifts-table.component.scss'
})
export class GiftsTableComponent {
  @Input() gifts: IGift[] = [];
  @Input() areActionsAvailable: boolean = false;
  @Output() callEditMethod: EventEmitter<IGift> = new EventEmitter<IGift>();
  @Output() callDeleteMethod: EventEmitter<IGift> = new EventEmitter<IGift>();
}
