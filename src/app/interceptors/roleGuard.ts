import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth-service';

export const roleGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);

  const router = inject(Router);

  const allowedRole = route.data?.['role'];

  const hasAccess =
    authService.hasRol(allowedRole);

  if (!hasAccess) {

    router.navigate(['/dashboard']);

    return false;
  }

  return true;
};