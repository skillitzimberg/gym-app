import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  sessionInProgress = false;
  exerciseSubscription: Subscription;
 
  constructor(private exerciseService: ExerciseService) { }

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
}
