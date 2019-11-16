import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivate,
  CanLoad,
  Route,
  Router, 
  RouterStateSnapshot 
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  // This is no longer in use. We are using CanLoad instead so we don't bother loading a module we aren't authorized to use.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  canLoad(route: Route): boolean {
    if(this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}