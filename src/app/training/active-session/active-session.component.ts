import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from "@angular/material";
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { EndSessionComponent } from './end-session.component';
import { ExerciseService } from '../../services/exercise.service';
import * as fromTraining from '../training.reducer';
import * as Training from '../training.actions';

@Component({
  selector: 'app-active-session',
  templateUrl: './active-session.component.html',
  styleUrls: ['./active-session.component.css']
})
export class ActiveSessionComponent implements OnInit {
  sessionProgress: number = 0;
  displayProgress: number;
  timer: any;
  @Output() exitSession = new EventEmitter();
  constructor(
    private dialog: MatDialog, 
    private exerciseService: ExerciseService,
    private store: Store<fromTraining.State>
  ) { }
  
  ngOnInit() {
    this.startOrResumeSession();
  }
  
  startOrResumeSession() {
    this.store.select(fromTraining.getCurrentExercise).pipe(take(1)).subscribe( ex => {
      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.sessionProgress = this.sessionProgress + 1;
        this.displayProgress = Math.round(this.sessionProgress);
        if(this.sessionProgress >= 100) {
          this.exerciseService.completeSession();
          clearInterval(this.timer);
        }
      }, step);
    })
  };

  confirmSessionExit() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(EndSessionComponent, {
      data:{
        displayProgress: this.displayProgress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.exerciseService.cancelSession(this.sessionProgress);
      } else {
        this.startOrResumeSession();
      }
    });
  }
}
