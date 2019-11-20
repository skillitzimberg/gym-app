import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { ExerciseService } from '../services/exercise.service';
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions';
import { UIService } from '../shared/ui.service';
import * as Auth from './auth.actions';
import { auth } from 'firebase';

@Injectable()
export class AuthService {
  private isAuthenticated: boolean;
  
  // Subject<T> extends Observable<T> implements SubscriptionLike
  authChange = new Subject<boolean>();

  constructor( 
    private afAuth: AngularFireAuth, 
    private exerciseService: ExerciseService,
    private router: Router,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.exerciseService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.store.dispatch(new Auth.SetUnauthenticated());
      }
    });
  }

  registerUser(authData: AuthData): void {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    )
    .then(result => {
      console.log(result);
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
  })
    .catch(err => {
      console.log(err);
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackBar(err.message, null, 3000);
    });
  }

  login(authData: AuthData): void {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    )
    .then(result => {
      console.log(result);
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
  })
    .catch(err => {
      console.log(err);
      this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
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