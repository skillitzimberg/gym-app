import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { ExerciseService } from '../services/exercise.service';
import * as fromApp from '../app.reducer'
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  private isAuthenticated: boolean = false;
  
  // Subject<T> extends Observable<T> implements SubscriptionLike
  authChange = new Subject<boolean>();

  constructor( 
    private afAuth: AngularFireAuth, 
    private exerciseService: ExerciseService,
    private router: Router,
    private uiService: UIService,
    private store: Store<{ ui: fromApp.State }>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.exerciseService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData): void {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({ type: 'START_LOADING'});
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    )
    .then(result => {
      console.log(result);
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({ type: 'STOP_LOADING'});
  })
    .catch(err => {
      console.log(err);
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({ type: 'STOP_LOADING'});
      this.uiService.showSnackBar(err.message, null, 3000);
    });
  }

  login(authData: AuthData): void {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({ type: 'START_LOADING'});
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    )
    .then(result => {
      console.log(result);
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({ type: 'STOP_LOADING'});
  })
    .catch(err => {
      console.log(err);
      this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({ type: 'STOP_LOADING'});
      this.uiService.showSnackBar(err.message, null, 3000)
    });
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  // Convenience method - returns the current state of isAuthenticated.
  isAuth(): boolean {
    return this.isAuthenticated;
  }
}