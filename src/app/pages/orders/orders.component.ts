import { Component, inject } from '@angular/core';
import { OrdersListComponent } from '../../components/orders/orders-list/orders-list.component';
import { OrdersService } from '../../services/orders.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    OrdersListComponent,
    PaginationComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  public ordersService: OrdersService = inject(OrdersService);

  constructor() {
    this.ordersService.getAll();
  }

}
