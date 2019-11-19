import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  Validators 
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private uiService: UIService,
    private store: Store< { ui: fromApp.State}>
  ) {}

  isLoading$: Observable<boolean>;
  private loadingSubscription: Subscription;
  
  ngOnInit(): void {
    this.isLoading$ = this.store.map(state => state.ui.isLoading);
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });
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

  // ngOnDestroy(): void {
  //   if(this.loadingSubscription) {
  //     this.loadingSubscription.unsubscribe();
  //   }
  // }
}
