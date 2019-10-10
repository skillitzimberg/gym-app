import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userID: Math.round(Math.random() * 10000).toString()
    };
    this.routeByAuthChange(this.isAuth(), '/training');
  }

  login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userID: Math.round(Math.random() * 10000).toString()
    };
    this.routeByAuthChange(this.isAuth(), '/training');
  }

  logout(): void {
    this.user = null;
    this.routeByAuthChange(this.isAuth(), '/login');
  }

  // creates a shallow copy of this.user to prevent other classes/methods from altering the original user.
  getUser(): User {
    return { ...this.user };
  }

  // Convenience method - if user is null isAuth returns false (user is not logged in); if user is not null isAuth returns true (user is logged in).
  isAuth(): boolean {
    return this.user != null;
  }

  private routeByAuthChange(isAuth: boolean, route: string): void {
    this.authChange.next(isAuth);
    this.router.navigate([route]);
  }
}