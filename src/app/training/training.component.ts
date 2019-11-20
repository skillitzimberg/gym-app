import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as fromRoot from '../app.reducer';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  sessionInProgress: boolean = false;
  exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;
 
  constructor( 
    private exerciseService: ExerciseService,
    private store: Store<fromRoot.State>
    ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.exerciseSubscription = this.exerciseService.sessionChangeRequested.subscribe(exercise => {
      if(exercise) {
        this.sessionInProgress = true;
      } else {
        this.sessionInProgress = false;
      }
    });
  }

  onStartSession() {
    this.sessionInProgress = !this.sessionInProgress;
  }

  ngOnDestroy(): void {
    if(this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
