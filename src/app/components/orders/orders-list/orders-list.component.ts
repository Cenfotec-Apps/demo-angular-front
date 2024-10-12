import { AfterViewInit, Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IOrder } from '../../../interfaces';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() title: string  = '';
  @Input() orders: IOrder[] = [];
  @Output() callModalAction: EventEmitter<IOrder> = new EventEmitter<IOrder>();
  @Output() callDeleteAction: EventEmitter<IOrder> = new EventEmitter<IOrder>();

  constructor() {
    console.log('title', this.title); 
  }
  ngOnInit(): void {
    console.log('ngOnInit', this.title); 
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.title); 
  }
  ngOnChanges(changes: SimpleChanges): void {
    // if(changes['title'].firstChange) {
    //   console.log('ngOnChanges', changes['title'].currentValue);
    // }
  }
}
