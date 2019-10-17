import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';

import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
@Injectable()
export class NewSessionComponent implements OnInit, OnDestroy {
  exerciseSubscription: Subscription;
  exercises: Exercise[];
  constructor(
    private exerciseService: ExerciseService
  ) { };

  ngOnInit() {
    this.exerciseService.fetchExerciseRepository();
    this.exerciseSubscription = this.exerciseService.exerciseRepoChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
  }

  onStartSession(form: NgForm) {
    this.exerciseService.startSession(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}