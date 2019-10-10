// IMPORTS FROM @ANGULAR
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// IMPORTS FROM APP
// APP modules
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

// APP Components
import { AppComponent } from './app.component'; // Root

import { ActiveSessionComponent } from './training/active-session/active-session.component';
import { EndSessionComponent } from './training/active-session/end-session.component';
import { HeaderComponent } from './navigation/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { NewSessionComponent } from './training/new-session/new-session.component';
import { PastSessionsComponent } from './training/past-sessions/past-sessions.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';

// APP Services
import { AuthService } from './auth/auth.service';

@NgModule({
  // This array declares Components, Pipes, & Directives available for app-wide use. (I do not understand this yet.)
  declarations: [
    AppComponent,
    ActiveSessionComponent,
    EndSessionComponent,
    HeaderComponent,
    LoginComponent,
    NewSessionComponent,
    PastSessionsComponent,
    SidenavListComponent,
    SignupComponent,
    TrainingComponent,
    WelcomeComponent,
  ],
  // This array imports modules only. (I do not understand this yet.)
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MatDialogModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  // Providers listed here are instantiated on App start up. These provider instances are then used over the course of the app's life.
  providers: [AuthService],
  bootstrap: [AppComponent],
  // Entry components are components not instantiated by using a selector in a template or by routing. Angular therefore needs to be prepared to instantiate them when needed. This list is where the framework looks for those components. (I do not understand this yet.)
  entryComponents: [
    EndSessionComponent
  ],
})
export class AppModule { }
