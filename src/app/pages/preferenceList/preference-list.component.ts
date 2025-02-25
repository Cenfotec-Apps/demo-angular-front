import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { PreferenceListService } from "../../services/preferenceList.service";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { PreferenceListComponent } from "../../components/preferenceList/preference-list/preference-list.component";

@Component({
  standalone: true,
  selector: 'app-preference-list-page',
  templateUrl: './preference-list.component.html',
  styleUrls: ['./preference-list.component.scss'],
  imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    PreferenceListComponent
  ]
})
export class PreferenceListPageComponent {
  public preferenceListService: PreferenceListService = inject(PreferenceListService);

  constructor() {
    this.preferenceListService.getAll();
  }
}