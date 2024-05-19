import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-my-account",
  standalone: true,
  templateUrl: "./my-account.component.html",
})
export class MyAccountComponent implements OnInit {
  public userName: string = 'Test';
  private service = inject(AuthService);

  constructor(public router: Router) {
  }

  ngOnInit() {}

  logout() {
    this.service.logout();
    this.router.navigateByUrl('/login');
  }
}
