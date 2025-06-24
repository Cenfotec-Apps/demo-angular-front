import { ModalService } from './../../services/modal.service';
import { Component, inject, ViewChild } from "@angular/core";
import { ISportTeam } from "../../interfaces";
import { SportTeamFormComponent } from "../../components/sport-team/sport-team-form/sport-team-form.component";
import { SportTeamListComponent } from "../../components/sport-team/sport-team-list/sport-team-list.component";
import { TeamService } from "../../services/team.service";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalComponent } from '../../components/modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-sport-team",
  templateUrl: "./sport-team.component.html",
  styleUrls: ["./sport-team.component.scss"],
  standalone: true,
  imports: [
    SportTeamFormComponent,
    SportTeamListComponent,
    PaginationComponent,
    ModalComponent
  ]
})
export class SportTeamComponent {
  public teamList: ISportTeam[] = []
  public teamService: TeamService = inject(TeamService);
  public fb: FormBuilder = inject(FormBuilder);
  public teamForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    coach: ['', Validators.required],
    stadium: ['', Validators.required],
    teamLogo: ['', Validators.required],
    founded: ['', Validators.required],
    isInClubsWorldCup: [false],
    players: [[]]
  });
  public modalService: ModalService = inject(ModalService);
  @ViewChild('editTeamModal') public editTeamModal: any;

  public authService: AuthService = inject(AuthService);
  public areActionsAvailable: boolean = false;
  public route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.route.data.subscribe( data => {
      this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
    });
  }

  constructor() {
    this.teamService.getAll();
  }

  saveTeam(item: ISportTeam) {
    this.teamService.save(item);
  }

  updateTeam(item: ISportTeam) {
    this.teamService.update(item);
    this.modalService.closeAll();
    this.teamForm.reset();
  }


  deleteTeam(item: ISportTeam) {
    this.teamService.delete(item);
  }

  openEditTeamModal(team: ISportTeam) {
    console.log("openEditTeamModal", team);
    this.teamForm.patchValue({
      id: JSON.stringify(team.id),
      name: team.name,
      coach: team.coach,
      stadium: team.stadium,
      teamLogo: team.teamLogo,
      founded: JSON.stringify(team.founded),
      isInClubsWorldCup: team.isInClubsWorldCup,
      players: team.players as any
    });
    this.modalService.displayModal('lg', this.editTeamModal);
  }

}