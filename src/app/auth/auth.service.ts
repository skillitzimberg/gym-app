import { User } from './user.model';
import { AuthData } from './auth-data.model';
export class AuthService {
  private user: User;

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userID: Math.round(Math.random() * 10000).toString()
    }
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userID: Math.round(Math.random() * 10000).toString()
    }
  }

  logout() {
    this.user = null;
  }

  // creates a shallow copy of this.user to prevent other classes/methods from altering the original user.
  getUser() {
    return { ...this.user };
  }

  // Convenience method - if user is null isAuth returns false (user is not logged in); if user is not null isAuth returns true (user is logged in).
  isAuth() {
    return this.user != null;
  }
}