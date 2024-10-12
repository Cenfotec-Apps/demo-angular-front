import { Component, inject, Input, ViewChild, OnInit, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalComponent{
  @Input() title?: string;
  @Input() confirmAction: string = '';
  @Input() cancelAction: string = '';
  @Input() customValidation: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() loadingConfirmationMethod: boolean = false;
  @Input() hideConfirmAction: boolean = false;
  @Input() useCustomBackGround: boolean = false;
  @Input() hideCancelOption: boolean = false;
  @Input() hideFooter: boolean = false;
  @Input() modalBodyClass: string = "modal-body";
  @Input() modalFooterClass: string = "modal-footer";
  @Input() modalContentClass: string = "modal-content";
  @Output() callCancelMethod = new EventEmitter();
  @Output() callConfirmationMethod = new EventEmitter();

  public modalService: NgbModal = inject(NgbModal)

  public hide() {
   this.modalService.dismissAll();
  }

  public hideModal() {
    this.hide();
    this.callCancelMethod.emit();
  }

}
