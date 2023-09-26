import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
 
  const isFlagEnabled = authService.loggedIn();
  return isFlagEnabled || router.createUrlTree(['login']); 
};

