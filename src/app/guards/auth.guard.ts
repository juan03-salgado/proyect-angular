import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const logeado = localStorage.getItem('logeado') === 'true';

  if (logeado){
    return true;
  } 
  const router = inject(Router);        // este inject es para que el guard pueda acceder al router y verificar 
  router.navigate(['/login']);
  return false;
};

