import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOrder } from '../../../interfaces';

@Component({
  selector: 'app-orders-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './orders-form.component.html',
  styleUrl: './orders-form.component.scss'
})
export class OrdersFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  public ordersForm: FormGroup = this.fb.group({
    description: ['', Validators.required],
    total: ['', Validators.required],
  })
  @Output() callSaveMethod: EventEmitter<IOrder> = new EventEmitter<IOrder>();

  callSave() {
    let order = {
      description: this.ordersForm.controls['description'].value,
      total: this.ordersForm.controls['total'].value
    }
    this.callSaveMethod.emit(order);
  }
}
