// @ANGULAR IMPORTS
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// APP IMPORTS
// Root
import { AppComponent } from './app.component';

// APP modules
import { AppRoutingModule } from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

// APP Components
import { ActiveSessionComponent } from './training/active-session/active-session.component';
import { LoginComponent } from './auth/login/login.component';
import { NewSessionComponent } from './training/new-session/new-session.component';
import { PastSessionsComponent } from './training/past-sessions/past-sessions.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';

@NgModule({
  // This array declares Components, Pipes, & Directives available for app-wide use
  declarations: [
    AppComponent,
    ActiveSessionComponent,
    LoginComponent,
    NewSessionComponent,
    PastSessionsComponent,
    SignupComponent,
    TrainingComponent,
    WelcomeComponent,
    SidenavListComponent,
    HeaderComponent,
  ],
  // This array imports modules only
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
