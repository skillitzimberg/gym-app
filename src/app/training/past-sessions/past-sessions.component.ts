import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';

import { Exercise } from '../../models/exercise.model';
import { ExerciseService } from '../../services/exercise.service';

import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-sessions',
  templateUrl: './past-sessions.component.html',
  styleUrls: ['./past-sessions.component.css']
})
export class PastSessionsComponent implements OnInit, AfterViewInit {
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
    private exerciseService: ExerciseService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit() {
    this.exerciseService.fetchPastSessions();
    this.store.select(fromTraining.getFinishedExercises).subscribe((pastSessions: Exercise[]) => {
      this.dataSource.data = pastSessions;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
