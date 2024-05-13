import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import moment from 'moment';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if(localStorage.getItem(environment.g) 
    && localStorage.getItem(environment.g)
    && localStorage.getItem(environment.e))
  {
    if (moment().unix() <= moment(localStorage.getItem(environment.e)).unix()) {
      return true;
    }
  }
  router.navigate(['/']);
  return false;
};
