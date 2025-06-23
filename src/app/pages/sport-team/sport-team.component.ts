import { Component } from "@angular/core";
import { ISportTeam } from "../../interfaces";
import { SportTeamFormComponent } from "../../components/sport-team/sport-team-form/sport-team-form.component";
import { SportTeamListComponent } from "../../components/sport-team/sport-team-list/sport-team-list.component";

@Component({
  selector: "app-sport-team",
  templateUrl: "./sport-team.component.html",
  styleUrls: ["./sport-team.component.scss"],
  standalone: true,
  imports: [
    SportTeamFormComponent,
    SportTeamListComponent
  ]
})
export class SportTeamComponent {
  teamList: ISportTeam[] = [
    {
      name: "Inter Miami",
      players: [
        "Lionel Messi",
        "Sergio Busquets",
        "Jordi Alba",
        "Diego Gómez",
        "Robert Taylor"
      ],
      stadium: "DRV PNK Stadium",
      founded: 2018,
      coach: "Javier Macherano",
      isInClubsWorldCup: true,
      teamLogo: "assets/img/teams-logos/logo-inter.png"
    },
    {
      name: "Barcelona",
      players: [
        "Robert Lewandowski",
        "Ferran Torres",
        "Ansu Fati",
        "Pedri",
        "Gavi"
      ],
      stadium: "Spotify Camp Nou",
      founded: 1899,
      coach: "Xavi Hernandez",
      isInClubsWorldCup: true,
      teamLogo: "assets/img/teams-logos/barcelona.png"
    },
    {
      name: "Real Madrid",
      players: [
        "Karim Benzema",
        "Vinícius Júnior",
        "Luka Modrić",
        "Toni Kroos",
        "Thibaut Courtois"
      ],
      stadium: "Santiago Bernabéu Stadium",
      founded: 1902,
      coach: "Carlo Ancelotti",
      isInClubsWorldCup: true,
      teamLogo: "assets/img/teams-logos/madrid.png"
    },
    {
      name: "Liga Deportiva Alajuelense",
      players: [
        "Celso Borges",
        "Yael López",
        "Aaron Suárez",
        "Diego Campos",
        "Joel Campbell"
      ],
      stadium: "Estadio Alejandro Morera Soto",
      founded: 1919,
      coach: "El macho Ramírez",
      isInClubsWorldCup: false,
      teamLogo: "assets/img/teams-logos/liga.png"
    }
  ]
}