import { Component, inject, ViewChild } from '@angular/core';
import { OrdersListComponent } from '../../components/orders/orders-list/orders-list.component';
import { OrdersService } from '../../services/orders.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalService } from '../../services/modal.service';
import { OrdersFormComponent } from '../../components/orders/orders-form/orders-form.component';
import { IOrder, IRoleType } from '../../interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  public authService: AuthService = inject(AuthService);
  @ViewChild('addOrdersModal') public addOrdersModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  orderForm = this.fb.group({
    id: [''],
    description: ['', Validators.required],
    total: ['', Validators.required],
  })

  constructor() {
    this.ordersService.search.page = 1;
    this.authService.isSuperAdmin() ?  this.ordersService.getAll() : this.ordersService.getAllByUser();
  }

  saveOrder(order: IOrder) {
    this.ordersService.save(order);
    this.modalService.closeAll();
  }

  callEdition(order: IOrder) {
    this.orderForm.controls['id'].setValue(order.id ? JSON.stringify(order.id) : '');
    this.orderForm.controls['description'].setValue(order.description ? order.description : '');
    this.orderForm.controls['total'].setValue(order.total ? JSON.stringify(order.total) : '');
    this.modalService.displayModal('md', this.addOrdersModal);
  }
  
  updateOrder(order: IOrder) {
    this.ordersService.update(order);
    this.modalService.closeAll();
  }

}
