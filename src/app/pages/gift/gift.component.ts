import { Component, inject } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { GiftListService } from '../../services/gift-list.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { GiftListComponent } from '../../components/gift/gift-list/gift-list.component';

@Component({
  selector: 'app-gift',
  standalone: true,
  imports: [
    PaginationComponent,
    LoaderComponent,
    GiftListComponent
  ],
  templateUrl: './gift.component.html',
  styleUrl: './gift.component.scss'
})
export class GiftComponent {
  public giftListService: GiftListService = inject(GiftListService);
  constructor() {
    this.giftListService.getAll();
  }
}
