// IMPORTS FROM @ANGULAR
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

// IMPORTS FROM APP
// Modules
import { AppRoutingModule } from './app.routing.module';
import { AuthModule } from './auth/auth.module';

// Components
import { AppComponent } from './app.component'; // Root
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { WelcomeComponent } from './welcome/welcome.component';

// Config
import { environment } from '../environments/environment';

// Services
import { AuthService } from './auth/auth.service';
import { ExerciseService } from './services/exercise.service';
import { SharedModule } from './shared/shared.module';
import { UIService } from './shared/ui.service';

// Reducers
import { appReducer } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    StoreModule.forRoot({
      ui: appReducer
    })
  ],
  providers: [
    AuthService, 
    ExerciseService,
    UIService,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }