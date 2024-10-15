import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IUser, IFeedbackStatus } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule, 
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() userForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() callUpdateMethod: EventEmitter<IUser> = new EventEmitter<IUser>();

  callSave() {
    let order: IUser = {
      email: this.userForm.controls['email'].value,
      name: this.userForm.controls['name'].value,
      lastname: this.userForm.controls['lastname'].value,
      password: this.userForm.controls['password'].value,
      updatedAt: this.userForm.controls['updatedAt'].value,
    }
    if(this.userForm.controls['id'].value) {
      order.id = this.userForm.controls['id'].value;
    } 
    if(order.id) {
      this.callUpdateMethod.emit(order);
    } else {
      this.callSaveMethod.emit(order);
    }
  }
}
