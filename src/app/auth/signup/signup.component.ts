import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as fromRoot from '../../app.reducer';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading$: Observable<boolean>;
  
  constructor(
    private authService: AuthService, 
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onSubmit(form: NgForm): void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }
}
