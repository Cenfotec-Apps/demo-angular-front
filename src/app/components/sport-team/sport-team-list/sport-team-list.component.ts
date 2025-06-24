import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { ISportTeam } from "../../../interfaces";
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-sport-team-list",
  templateUrl: "./sport-team-list.component.html",
  styleUrls: ["./sport-team-list.component.scss"],
  standalone: true
})
export class SportTeamListComponent {
  @Input() pTeamList: ISportTeam[] = [];
  @Output() callUpdateModalMethod: EventEmitter<ISportTeam> = new EventEmitter<ISportTeam>();
  @Output() callDeleteMethod: EventEmitter<ISportTeam> = new EventEmitter<ISportTeam>();
  public authService: AuthService = inject(AuthService);
  public areActionsAvailable: boolean = false;
  public route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.route.data.subscribe( data => {
      this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
    });
  }

}