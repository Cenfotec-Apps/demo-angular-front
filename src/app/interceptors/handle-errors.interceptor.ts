import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const handleErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return next(req).pipe(
    catchError((error: any): Observable<any> => {
      if ((error.status === 401 || error.status === 403) && !req.url.includes('auth')) {
        authService.logout();
        router.navigateByUrl('/login');
        return of({ status: false });
      }
      if (error.status === 422) {
        throw error.error;
      }
      if (error.status === 404) {
        throw { status: false };
      }
      return of({ status: false });
    })
  );
};
