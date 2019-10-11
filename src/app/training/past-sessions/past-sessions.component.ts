import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

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
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort, null) sort: MatSort;
  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.dataSource.data = this.exerciseService.getPastSessions();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
