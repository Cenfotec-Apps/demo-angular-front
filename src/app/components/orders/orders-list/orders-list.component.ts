import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IOrder } from '../../../interfaces';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
  @Input() title: string  = '';
  @Input() orders: IOrder[] = [];
  @Output() callModalAction: EventEmitter<IOrder> = new EventEmitter<IOrder>();
  @Output() callDeleteAction: EventEmitter<IOrder> = new EventEmitter<IOrder>();
}
