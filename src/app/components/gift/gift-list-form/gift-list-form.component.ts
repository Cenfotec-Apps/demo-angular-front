import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IGiftList } from '../../../interfaces';

@Component({
  selector: 'app-gift-list-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './gift-list-form.component.html',
  styleUrl: './gift-list-form.component.scss'
})
export class GiftListFormComponent {
  @Input() form!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IGiftList> = new EventEmitter<IGiftList>();
}
