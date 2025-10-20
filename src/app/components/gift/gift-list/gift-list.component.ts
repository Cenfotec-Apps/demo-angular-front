import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGiftList } from '../../../interfaces';

@Component({
  selector: 'app-gift-list',
  standalone: true,
  imports: [],
  templateUrl: './gift-list.component.html',
  styleUrl: './gift-list.component.scss'
})
export class GiftListComponent {
  @Input() giftsList: IGiftList[] = [];
  @Output() callEditMethod: EventEmitter<IGiftList> = new EventEmitter<IGiftList>();
  @Output() callDeleteMethod: EventEmitter<IGiftList> = new EventEmitter<IGiftList>();
}
