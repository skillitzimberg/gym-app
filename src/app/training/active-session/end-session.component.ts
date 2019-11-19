import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-end-session',
  template: `<h1 mat-dialog-title>End training session?<h1>
  <mat-dialog-content>
    <p>You've completed {{ sessionData.displayProgress }}% of this session.</p>
  </mat-dialog-content>
<mat-dialog-actions>
  <button mat-button [mat-dialog-close]="true">End</button>
  <button mat-button [mat-dialog-close]="false">Continue</button>
</mat-dialog-actions>`,
  styleUrls: ['./active-session.component.css']
})
export class EndSessionComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public sessionData: any) {}
}