import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from "@angular/material";
import { EndSessionComponent } from './end-session.component';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-active-session',
  templateUrl: './active-session.component.html',
  styleUrls: ['./active-session.component.css']
})
export class ActiveSessionComponent implements OnInit {
  // inSession: boolean = false;
  sessionProgress: number = 0;
  displayProgress: number;
  timer: any;
  @Output() exitSession = new EventEmitter();
  constructor(
    private dialog: MatDialog, 
    private exerciseService: ExerciseService
  ) { }
  
  ngOnInit() {
    this.startOrResumeSession();
  }
  
  startOrResumeSession() {
    const step = this.exerciseService.getcurrentSession().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.sessionProgress = this.sessionProgress + 1;
      this.displayProgress = Math.round(this.sessionProgress);
      if(this.sessionProgress >= 100) {
        this.exerciseService.completeSession();
        clearInterval(this.timer);
      }
    }, step);
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
