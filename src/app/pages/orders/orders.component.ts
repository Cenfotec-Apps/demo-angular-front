import { Component, inject, ViewChild } from '@angular/core';
import { OrdersListComponent } from '../../components/orders/orders-list/orders-list.component';
import { OrdersService } from '../../services/orders.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalService } from '../../services/modal.service';
import { OrdersFormComponent } from '../../components/orders/orders-form/orders-form.component';
import { IOrder } from '../../interfaces';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    OrdersListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    OrdersFormComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  public ordersService: OrdersService = inject(OrdersService);
  public modalService: ModalService = inject(ModalService);
  @ViewChild('addOrdersModal') public addOrdersModal: any;

  constructor() {
    this.ordersService.getAllByUser();
  }

  saveOrder(order: IOrder) {
    this.ordersService.save(order);
    this.modalService.closeAll();
  }

}
