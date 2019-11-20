import { Action } from '@ngrx/store';
import { Exercise } from '../models/exercise.model';

export const SET_EXERCISES = '[Training] Set Exercises';
export const SET_FINISHED_EXERCISES = '[Training] Set Finished Exercises';
export const SET_CURRENT_EXERCISE = '[Training] Set Current Exercise';
export const START_SESSION = '[Training] Start Session';
export const STOP_SESSION = '[Training] Stop Session';

export class SetExercises implements Action {
  readonly type = SET_EXERCISES;

  constructor(public payload: Exercise[]) {};
}

export class SetFinishedExercises implements Action {
  readonly type = SET_FINISHED_EXERCISES;

  constructor(public payload: Exercise[]) {};
}

export class SetCurrentExercise implements Action {
  readonly type = SET_CURRENT_EXERCISE;

  constructor(public payload: Exercise) {};
}

export class StartSession implements Action {
  readonly type = START_SESSION;
  
  constructor(public payload: Exercise) {};
}

export class StopSession implements Action {
  readonly type = STOP_SESSION;
  
  constructor(public payload: Exercise) {};
}

export type TrainingActions = 
  StartSession | 
  StopSession | 
  SetExercises | 
  SetFinishedExercises |
  SetCurrentExercise;