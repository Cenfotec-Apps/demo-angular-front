import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ISportTeam } from "../../../interfaces";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-sport-team-form",
  templateUrl: "./sport-team-form.component.html",
  styleUrls: ["./sport-team-form.component.scss"],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
})
export class SportTeamFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() form!: FormGroup;
  @Output() callSaveMethod: EventEmitter<ISportTeam> = new EventEmitter<ISportTeam>();
  @Output() callUpdateMethod: EventEmitter<ISportTeam> = new EventEmitter<ISportTeam>();

  callSave() {
    let item: ISportTeam = {
      name: this.form.controls["name"].value,
      coach: this.form.controls["coach"].value,
      stadium: this.form.controls["stadium"].value,
      teamLogo: this.form.controls["teamLogo"].value,
      founded: this.form.controls["founded"].value,
      isInClubsWorldCup: this.form.controls["isInClubsWorldCup"].value,
      players: this.form.controls["players"].value || [],
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