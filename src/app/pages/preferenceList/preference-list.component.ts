import { PreferenceListFormComponent } from './../../components/preferenceList/preference-list-form/preference-list-form.component';
import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { PreferenceListService } from "../../services/preferenceList.service";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { PreferenceListComponent } from "../../components/preferenceList/preference-list/preference-list.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ModalService } from "../../services/modal.service";
import { FormBuilder, Validators } from "@angular/forms";
import { IPreferenceList } from '../../interfaces';

@Component({
  standalone: true,
  selector: 'app-preference-list-page',
  templateUrl: './preference-list.component.html',
  styleUrls: ['./preference-list.component.scss'],
  imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    PreferenceListComponent,
    ModalComponent,
    PreferenceListFormComponent
  ]
})
export class PreferenceListPageComponent {
  public preferenceListService: PreferenceListService = inject(PreferenceListService);
  public modalService: ModalService = inject(ModalService);
  public fb: FormBuilder = inject(FormBuilder);
  @ViewChild('addPreferenceListModal') public addPreferenceListModal: any;
  public title: string = 'Preference List';
  public preferenceListForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
  })

  constructor() {
    this.preferenceListService.getAll();
  }

  savePreferenceList(item: IPreferenceList) {
    this.preferenceListService.save(item);
    this.modalService.closeAll();
  }

  updatePreferenceList(item: IPreferenceList) {
    this.preferenceListService.update(item);
    this.modalService.closeAll();
  }

  callEdition(item: IPreferenceList) {
    this.preferenceListForm.controls['id'].setValue(item.id ? JSON.stringify(item.id) : '');
    this.preferenceListForm.controls['name'].setValue(item.name ? item.name : '');
    this.modalService.displayModal('md', this.addPreferenceListModal);
  }

  deletePreferenceList(item: IPreferenceList) {
    this.preferenceListService.delete(item);
  }
}