import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IPreferenceList } from '../../../interfaces';

@Component({
  selector: 'app-preference-list-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './preference-list-form.component.html',
  styleUrl: './preference-list-form.component.scss'
})
export class PreferenceListFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() form!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IPreferenceList> = new EventEmitter<IPreferenceList>();
  @Output() callUpdateMethod: EventEmitter<IPreferenceList> = new EventEmitter<IPreferenceList>();

  callSave() {
    let item: IPreferenceList = {
      name: this.form.controls['name'].value,
      movies: []
    }
    if(this.form.controls['id'].value) {
      item.id = this.form.controls['id'].value;
    } 
    if(item.id) {
      this.callUpdateMethod.emit(item);
    } else {
      this.callSaveMethod.emit(item);
    }
  }
}
