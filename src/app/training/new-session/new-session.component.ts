import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as fromRoot from '../../app.reducer';

import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/exercise.model';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
@Injectable()
export class NewSessionComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  private exerciseSubscription: Subscription;

  isLoading$: Observable<boolean>;
  private loadingSubscription: Subscription;

  constructor(
    private exerciseService: ExerciseService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { };

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   isLoading => this.isLoading$ = isLoading
    // );
    this.fetchExercises();
    this.exerciseSubscription = this.exerciseService.exerciseRepoChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
  }

  onStartSession(form: NgForm) {
    this.exerciseService.startSession(form.value.exercise);
  }

  fetchExercises() {
    this.exerciseService.fetchExerciseRepository();
  }

  ngOnDestroy() {
    if(this.exerciseSubscription) {
     this.exerciseSubscription.unsubscribe();
    }

    if(this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}