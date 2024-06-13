import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { IRole } from "../interfaces";

@Injectable({
  providedIn: 'root',
})
export class AdminRoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const hasRole = this.authService.hasRole(IRole.admin) || this.authService.hasRole(IRole.superAdmin);

    if (!hasRole) {
      this.router.navigate(['access-denied']);
      return false;
    }
    return true;
  }
}