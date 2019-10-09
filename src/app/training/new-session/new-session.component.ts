import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css']
})
export class NewSessionComponent implements OnInit {
  @Output() sessionStarted = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  startSession() {
    this.sessionStarted.emit();
  }
}
