import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const Authservice=inject(AuthService);
  const router=inject(Router);
  if(Authservice.islogedin){
    return true;
  }else{
    router.navigateByUrl('/login');
    return false;
  }
};
export const adminGuard: CanActivateFn = (route, state) => {
  const Authservice=inject(AuthService);
  const router=inject(Router);
  if(Authservice.islogedin){
    if(Authservice.isadmin){
      return true;
    }else{
      router.navigateByUrl("/")
      return false
    }
  }else{
    router.navigateByUrl('/login');
    return false;
  }
};
