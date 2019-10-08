// @ANGULAR IMPORTS
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// APP IMPORTS
//Root
import { AppComponent } from './app.component';

// Sub-Modules
import { ActiveSessionComponent } from './training/active-session/active-session.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './auth/login/login.component';
import { MaterialModule } from './material.module';
import { NewSessionComponent } from './training/new-session/new-session.component';
import { PastSessionsComponent } from './training/past-sessions/past-sessions.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    // This array declares Components, Pipes, Directives
    AppComponent,
    ActiveSessionComponent,
    LoginComponent,
    NewSessionComponent,
    PastSessionsComponent,
    SignupComponent,
    TrainingComponent,
    WelcomeComponent,
  ],
  imports: [
    // This array imports modules only
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
