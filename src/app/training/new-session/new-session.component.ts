import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
@Injectable()
export class NewSessionComponent implements OnInit {
  exercises: Exercise[] = [];
  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exercises = this.exerciseService.getExercises();
  }

  onStartSession(form: NgForm) {
    this.exerciseService.startSession(form.value.exercise);
  }
}
