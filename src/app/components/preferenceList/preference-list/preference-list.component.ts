import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPreferenceList } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preference-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './preference-list.component.html',
  styleUrl: './preference-list.component.scss'
})
export class PreferenceListComponent {
  @Input() title: string  = '';
  @Input() preferenceList: IPreferenceList[] = [];
  @Output() callModalAction: EventEmitter<IPreferenceList> = new EventEmitter<IPreferenceList>();
  @Output() callDeleteAction: EventEmitter<IPreferenceList> = new EventEmitter<IPreferenceList>();
}
