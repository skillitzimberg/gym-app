import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

import { Exercise } from '../models/exercise.model';

@Injectable()
export class ExerciseService {
  sessionChangeRequested = new Subject<Exercise>();
  private currentSession: Exercise;

  exerciseRepoChanged = new Subject<Exercise[]>();
  private exerciseRepository: Exercise[] = [];

  pastSessionRepoChanged = new Subject<Exercise[]>();
  private pastSessions: Exercise[] = [];
  
  constructor( private db: AngularFirestore ) {}

  private retrieveSelectedCollection(collection: string) {
    return this.db.collection(collection)
    .snapshotChanges()
    .map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data(),
        };
      });
    })
  }
  
  fetchExerciseRepository() {
    this.retrieveSelectedCollection('exerciseRepository')
    .subscribe((repo: Exercise[]) => {
      this.exerciseRepository = repo;
      this.exerciseRepoChanged.next([...this.exerciseRepository]);
    });
  }

  fetchPastSessions() {
    this.retrieveSelectedCollection('pastSession')
    .subscribe((repo: Exercise[]) => {
      this.pastSessionRepoChanged.next(repo);
    });
  }

  startSession(selectedExercise: Exercise) {
    this.currentSession = selectedExercise;
    this.sessionChangeRequested.next({ ...this.currentSession });
  }

  getcurrentSession() {
    return { ...this.currentSession };
  }

  getPastSessions() {
    return this.pastSessions.slice();
  }

  private nullCurrentSession() {
    this.currentSession = null;
    this.sessionChangeRequested.next(null);
  }

  completeSession() {
    this.addSessionToDatabase({ 
      ...this.currentSession, 
      date: new Date(), 
      state: 'completed'
    });
    this.nullCurrentSession();
  }

  cancelSession(progress: number) {
    this.addSessionToDatabase({ 
      ...this.currentSession, 
      date: new Date(), 
      duration: this.currentSession.duration * (progress / 100), 
      calories: this.currentSession.calories * (progress / 100), 
      state: 'cancelled'
    });
    this.nullCurrentSession();
  }

  private addSessionToDatabase(exercise: Exercise) {
    this.db.collection('pastSession').add(exercise);
  }
}