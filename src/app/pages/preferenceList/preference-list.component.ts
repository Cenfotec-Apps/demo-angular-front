import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  standalone: true,
  selector: 'app-preference-list',
  templateUrl: './preference-list.component.html',
  styleUrls: ['./preference-list.component.scss'],
  imports: [
    CommonModule,
    LoaderComponent
  ]
})
export class PreferenceListComponent {

}