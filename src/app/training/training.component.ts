import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Exercise } from '../models/exercise.model';

import * as fromRoot from '../app.reducer';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  sessionInProgress$: Observable<boolean>;
  isLoading$: Observable<boolean>;
 
  constructor( 
    private store: Store<fromTraining.State>
    ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.sessionInProgress$ = this.store.select(fromTraining.getSessionInProgress);
  }

  onStartSession(exercise: Exercise) {
    this.store.dispatch(new Training.StartSession(exercise));
  }
}
