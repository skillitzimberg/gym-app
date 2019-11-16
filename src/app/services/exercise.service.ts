import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';

import { Exercise } from '../models/exercise.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class ExerciseService {
  sessionChangeRequested = new Subject<Exercise>();
  private currentSession: Exercise;

  exerciseRepoChanged = new Subject<Exercise[]>();
  private exerciseRepository: Exercise[] = [];

  pastSessionRepoChanged = new Subject<Exercise[]>();
  private pastSessions: Exercise[] = [];
  
  private fbSubscriptions: Subscription[] = [];

  constructor( 
    private db: AngularFirestore,
    private uiService: UIService
  ) {}

  private retrieveCollection(collection: string) {
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
    this.uiService.loadingStateChanged.next(true);
    this.fbSubscriptions.push(this.retrieveCollection('exerciseRepository')
    .subscribe((repo: Exercise[]) => {
      this.uiService.loadingStateChanged.next(false);
      this.exerciseRepository = repo;
      this.exerciseRepoChanged.next([...this.exerciseRepository]);
    },
    (error: Error) => {
      if(error) {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar('Exercise service is not able to fetch exercises.', null, 3000)
      }
    }));
  }

  fetchPastSessions() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubscriptions.push(this.retrieveCollection('pastSession')
    .subscribe((repo: Exercise[]) => {
      this.pastSessionRepoChanged.next(repo);
    },
    (error: Error) => {
      if(error) {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar('Exercise service is not able to past sessions.', null, 3000)
      }
    }));
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

  cancelSubscriptions() {
    this.fbSubscriptions.forEach(sub => sub.unsubscribe())
  }
}