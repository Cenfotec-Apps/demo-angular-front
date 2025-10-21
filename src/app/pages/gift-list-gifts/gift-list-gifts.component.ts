import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GiftService } from '../../services/gift.service';
import { GiftListService } from '../../services/gift-list.service';
import { IGift, IGiftList } from '../../interfaces';
import { GiftFormComponent } from '../../components/gift/gift-form/gift-form.component';
import { GiftsTableComponent } from '../../components/gift/gifts-table/gifts-table.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-gift-list-gifts',
  standalone: true,
  imports: [
    CommonModule,
    GiftFormComponent,
    GiftsTableComponent,
    PaginationComponent
  ],
  templateUrl: './gift-list-gifts.component.html',
  styleUrls: ['./gift-list-gifts.component.scss']
})
export class GiftListGiftsComponent implements OnInit {
  public giftService: GiftService = inject(GiftService);
  public giftListService: GiftListService = inject(GiftListService);
  public fb: FormBuilder = inject(FormBuilder);
  private route: ActivatedRoute = inject(ActivatedRoute);
  
  public giftListId: number = 0;
  public currentGiftList?: IGiftList;
  public isEdit: boolean = false;
  
  public form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: [''],
    price: [0],
    imageUrl: ['']
  });

  constructor() {
    effect(() => {
      console.log('gifts updated', this.giftService.gifts$());
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.giftListId = +params['id'];
      if (this.giftListId) {
        this.loadGiftList();
        this.giftService.getGiftsByGiftListId(this.giftListId);
      }
    });
  }

  loadGiftList() {
    // Load gift list details if needed
    // This would require adding a method to get a single gift list
  }

  loadGifts() {
    this.giftService.getGiftsByGiftListId(this.giftListId);
  }

  save(gift: IGift) {
    if (this.isEdit && gift.id) {
      gift.giftList = { id: this.giftListId };
      this.giftService.update(gift);
    } else {
      this.giftService.addGiftToGiftList(this.giftListId, gift);
    }
    this.form.reset();
    this.isEdit = false;
  }

  edit(gift: IGift) {
    this.isEdit = true;
    this.form.patchValue({
      id: gift.id || 0,
      name: gift.name || '',
      description: gift.description || '',
      price: gift.price || 0,
      imageUrl: gift.imageUrl || ''
    });
  }

  delete(gift: IGift) {
    if (gift.id) {
      this.giftService.deleteGiftFromGiftList(this.giftListId, gift.id);
    }
  }
}
