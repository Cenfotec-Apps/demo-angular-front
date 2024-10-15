import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  @Input() orderForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IOrder> = new EventEmitter<IOrder>();
  @Output() callUpdateMethod: EventEmitter<IOrder> = new EventEmitter<IOrder>();

  callSave() {
    let order: IOrder = {
      description: this.orderForm.controls['description'].value,
      total: this.orderForm.controls['total'].value
    }
    if(this.orderForm.controls['id'].value) {
      order.id = this.orderForm.controls['id'].value;
    } 
    if(order.id) {
      this.callUpdateMethod.emit(order);
    } else {
      this.callSaveMethod.emit(order);
    }
  }
}
