import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  Validators 
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

  }

  loginForm = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  onSubmit() {
    console.log(this.loginForm);
  }

}
