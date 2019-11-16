import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';

import { Exercise } from '../../models/exercise.model';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-past-sessions',
  templateUrl: './past-sessions.component.html',
  styleUrls: ['./past-sessions.component.css']
})
export class PastSessionsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns = [
    'date',
    'name',
    'duration',
    'calories',
    'state',
  ];
  pastSessionSubscription: Subscription;
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort, null) sort: MatSort;
  constructor(
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    this.exerciseService.fetchPastSessions();
    this.pastSessionSubscription = this.exerciseService.pastSessionRepoChanged.subscribe((pastSessions: Exercise[]) => {
      this.dataSource.data = pastSessions;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    if(this.pastSessionSubscription) {
      this.pastSessionSubscription.unsubscribe();
    }
  }
}
