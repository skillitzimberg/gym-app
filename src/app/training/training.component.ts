import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  sessionInProgress: boolean = false;
  exerciseSubscription: Subscription;
  isLoading: boolean;
 
  constructor( 
    private exerciseService: ExerciseService,
    ) { }

  ngOnInit() {
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
