import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  Validators 
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.State>
  ) {}

  isLoading$: Observable<boolean>;
  
  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  loginForm = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  onSubmit(): void {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }
}
