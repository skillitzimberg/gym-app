import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import * as Training from '../training.actions';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
@Injectable()
export class NewSessionComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private exerciseService: ExerciseService,
    private store: Store<fromTraining.State>
  ) { };

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.fetchExercises();
    this.exercises$ = this.store.select(fromTraining.getExercises);
  }

  onStartSession(form: NgForm) {
    this.store.dispatch(new Training.SetCurrentExercise(form.value.exercise));
  }

  fetchExercises() {
    return this.exerciseService.fetchExerciseRepository();
  }
}