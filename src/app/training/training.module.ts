import { MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { trainingReducer } from './training.reducer';

import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

import { ActiveSessionComponent } from './active-session/active-session.component';
import { EndSessionComponent } from './active-session/end-session.component';
import { NewSessionComponent } from './new-session/new-session.component';
import { PastSessionsComponent } from './past-sessions/past-sessions.component';
import { TrainingComponent } from './training.component';

@NgModule({
  declarations: [
    ActiveSessionComponent,
    EndSessionComponent,
    NewSessionComponent,
    PastSessionsComponent,
    TrainingComponent
  ],
  imports: [
    MatDialogModule,
    SharedModule,
    StoreModule.forFeature('training', trainingReducer),
    TrainingRoutingModule,
  ],
  exports:[],
  entryComponents: [
    EndSessionComponent
  ],
})
export class TrainingModule { }