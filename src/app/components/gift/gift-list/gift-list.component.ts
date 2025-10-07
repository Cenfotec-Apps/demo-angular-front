import { Component, Input } from '@angular/core';
import { IGift } from '../../../interfaces';

@Component({
  selector: 'app-gift-list',
  standalone: true,
  imports: [],
  templateUrl: './gift-list.component.html',
  styleUrl: './gift-list.component.scss'
})
export class GiftListComponent {
  @Input() gifts: IGift[] = [];
}
