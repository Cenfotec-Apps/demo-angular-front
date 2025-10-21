import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GiftService } from '../../services/gift.service';
import { GiftListService } from '../../services/gift-list.service';
import { IGift } from '../../interfaces';
import { GiftFormComponent } from '../../components/gift/gift-form/gift-form.component';
import { GiftsTableComponent } from '../../components/gift/gifts-table/gifts-table.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [
    CommonModule,
    GiftFormComponent,
    GiftsTableComponent,
    LoaderComponent,
    PaginationComponent
  ],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.scss'
})
export class GiftsComponent implements OnInit {
  public giftService: GiftService = inject(GiftService);
  public giftListService: GiftListService = inject(GiftListService);
  public fb: FormBuilder = inject(FormBuilder);
  public areActionsAvailable: boolean = false;
  public authService: AuthService = inject(AuthService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  
  public isEdit: boolean = false;
  
  public form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: [''],
    price: [0],
    imageUrl: [''],
    giftListId: ['', Validators.required]
  });

  constructor() {
    effect(() => {
      console.log('gifts updated', this.giftService.gifts$());
    });
  }

  ngOnInit() {
    this.giftListService.getAll();
    this.giftService.getAll();
    this.route.data.subscribe( data => {
      this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
      console.log('areActionsAvailable', this.areActionsAvailable);
    });
  }

  save(gift: IGift) {
    const giftListId = this.form.get('giftListId')?.value;
    
    if (this.isEdit && gift.id) {
      gift.giftList = { id: Number(giftListId) };
      this.giftService.update(gift);
    } else {
      if (giftListId) {
        this.giftService.addGiftToGiftList(Number(giftListId), gift);
      }
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
      imageUrl: gift.imageUrl || '',
      giftListId: gift.giftList?.id?.toString() || ''
    });
  }

  delete(gift: IGift) {
    if (gift.id && gift.giftList?.id) {
      this.giftService.deleteGiftFromGiftList(gift.giftList.id, gift.id);
    } else if (gift.id) {
      this.giftService.delete(gift);
    }
  }
}
