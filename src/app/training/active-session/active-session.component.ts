import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from "@angular/material";
import { EndSessionComponent } from './end-session.component';

@Component({
  selector: 'app-active-session',
  templateUrl: './active-session.component.html',
  styleUrls: ['./active-session.component.css']
})
export class ActiveSessionComponent implements OnInit {
  inSession: boolean = false;
  sessionProgress: number = 0;
  displayProgress: number;
  timer: any;
  @Output() exitSession = new EventEmitter();
  constructor(private dialog: MatDialog) { }
  
  ngOnInit() {
    this.startOrResumeSession();
  }
  
  startOrResumeSession() {
    this.timer = setInterval(() => {
      this.sessionProgress = this.sessionProgress + 5;
      this.displayProgress = Math.round(this.sessionProgress);
      if(this.displayProgress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
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
        this.exitSession.emit();
      } else {
        this.startOrResumeSession();
      }
    });
  }
}
