import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/login.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
 
  const isFlagEnabled = authService.checkAdmin();
  return isFlagEnabled || router.createUrlTree(['']); 
};
