import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';
export class ExerciseService {
  private exerciseRepository: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  
  // Subject<T> extends Observable<T> implements SubscriptionLike
  sessionChangeRequested = new Subject<Exercise>();
  private currentSession: Exercise;
  private completedSessions: Exercise[] = [];

  getExercises() {
    return this.exerciseRepository.slice();
  }

  startSession(selectedExercise: Exercise) {
    this.currentSession = this.exerciseRepository.find(exercise => exercise.id === selectedExercise.id);
    this.sessionChangeRequested.next({ ...this.currentSession });
  }

  getcurrentSession() {
    return { ...this.currentSession };
  }

  getPastSessions() {
    return this.completedSessions.slice();
  }

  private nullCurrentSession() {
    this.currentSession = null;
    this.sessionChangeRequested.next(null);
  }

  completeSession() {
    this.completedSessions.push({ 
      ...this.currentSession, 
      date: new Date(), 
      state: 'completed'
    });
    this.nullCurrentSession();
  }

  cancelSession(progress: number) {
    this.completedSessions.push({ 
      ...this.currentSession, 
      date: new Date(), 
      duration: this.currentSession.duration * (progress / 100), 
      calories: this.currentSession.calories * (progress / 100), 
      state: 'cancelled'
    });
    this.nullCurrentSession();
  }
}