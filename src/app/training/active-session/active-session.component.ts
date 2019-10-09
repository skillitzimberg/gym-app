import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-session',
  templateUrl: './active-session.component.html',
  styleUrls: ['./active-session.component.css']
})
export class ActiveSessionComponent implements OnInit {
  inSession = false;
  sessionProgress = 0;
  timer = null;
  constructor() { }
  
  ngOnInit() {
    this.inSession = true;
    this.timer = setInterval(() => {
      this.sessionProgress = this.sessionProgress + 0.1;
    }, 100);
  }
  
  stopStartSession() {
    if (this.inSession) {
      this.inSession = false;
      clearInterval(this.timer);
    } else {
      this.inSession = true;
      this.timer = setInterval(() => {
        this.sessionProgress = this.sessionProgress + 0.1;
      }, 100);
    }
  };



}
