import { Component, effect, inject } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { GiftListService } from '../../services/gift-list.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { GiftListComponent } from '../../components/gift/gift-list/gift-list.component';
import { GiftListFormComponent } from '../../components/gift/gift-list-form/gift-list-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { IGiftList } from '../../interfaces';

@Component({
  selector: 'app-gift',
  standalone: true,
  imports: [
    PaginationComponent,
    LoaderComponent,
    GiftListComponent,
    GiftListFormComponent
  ],
  templateUrl: './gift.component.html',
  styleUrl: './gift.component.scss'
})
export class GiftComponent {
  public giftListService: GiftListService = inject(GiftListService);
  public fb: FormBuilder = inject(FormBuilder);
  public form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required]
  })
  constructor() {
    this.giftListService.getAll();
    effect(() => {
      console.log('gift lists updated', this.giftListService.giftsLists$());
      if (this.giftListService.giftsLists$()[0]) {
        this.giftListService.giftsLists$()[0] ?  this.giftListService.giftsLists$()[0].name = `${this.giftListService.giftsLists$()[0].name} - Caros` : null;
      }
    });
  }

  save(item: IGiftList) {
    item.id ? this.giftListService.update(item) : this.giftListService.save(item);
    this.form.reset();
  }

  delete(item: IGiftList) {
    console.log('delete', item);
    this.giftListService.delete(item);
  }
}
