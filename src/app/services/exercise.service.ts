import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Exercise } from '../models/exercise.model';
import { UIService } from '../shared/ui.service';

import * as UI from '../shared/ui.actions';
import * as Training from '../training/training.actions';
import * as fromTraining from '../training/training.reducer';

@Injectable()
export class ExerciseService {
  sessionChangeRequested = new Subject<Exercise>();
  private currentSession: Exercise;

  exerciseRepoChanged = new Subject<Exercise[]>();

  pastSessionRepoChanged = new Subject<Exercise[]>();
  private pastSessions: Exercise[] = [];
  
  private fbSubscriptions: Subscription[] = [];

  constructor( 
    private db: AngularFirestore,
    private store: Store<fromTraining.State>,
    private uiService: UIService
  ) {}

  private retrieveCollection(collection: string) {
    this.store.dispatch(new UI.StartLoading());
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
    this.fbSubscriptions.push(this.retrieveCollection('exerciseRepository')
    .subscribe((repo: Exercise[]) => {
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new Training.SetExercises(repo));
    },
    (error: Error) => {
      if(error) {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar('Exercise service is not able to fetch exercises.', null, 3000)
      }
    }));
  }

  fetchPastSessions() {
    this.fbSubscriptions.push(this.retrieveCollection('pastSession')
    .subscribe((repo: Exercise[]) => {
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new Training.SetFinishedExercises(repo));
    },
    (error: Error) => {
      if(error) {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar('Exercise service is not able to past sessions.', null, 3000)
      }
    }));
  }

  startSession(selectedExercise: Exercise) {
    this.store.dispatch(new Training.StartSession(selectedExercise));
  }

  getcurrentSession() {
    return { ...this.currentSession };
  }

  getPastSessions() {
    return this.pastSessions.slice();
  }

  private nullCurrentSession() {
    this.currentSession = null;
  }

  completeSession() {
    this.store.select(fromTraining.getCurrentExercise).pipe(take(1)).subscribe(ex => {
      this.addSessionToDatabase({ 
        ...ex, 
        date: new Date(), 
        state: 'completed'
      });
      this.store.dispatch(new Training.StopSession(ex));
    })
  }

  cancelSession(progress: number) {
    this.store.select(fromTraining.getCurrentExercise).pipe(take(1)).subscribe(ex => {
      this.addSessionToDatabase({ 
        ...ex, 
        date: new Date(), 
        duration: ex.duration * (progress / 100), 
        calories: ex.calories * (progress / 100), 
        state: 'cancelled'
      });
      this.store.dispatch(new Training.StopSession(ex));
    })

  }

  private addSessionToDatabase(exercise: Exercise) {
    this.db.collection('pastSession').add(exercise);
  }

  cancelSubscriptions() {
    this.fbSubscriptions.forEach(sub => sub.unsubscribe())
  }
}