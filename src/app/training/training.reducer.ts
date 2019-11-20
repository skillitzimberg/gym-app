import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { 
  TrainingActions, 
  SET_EXERCISES, 
  SET_FINISHED_EXERCISES, 
  SET_CURRENT_EXERCISE, 
  START_SESSION, 
  STOP_SESSION 
} from './training.actions';
import { Exercise } from '../models/exercise.model';

export interface TrainingState {
  exercises: Exercise[];
  finishedExercises: Exercise[];
  currentExercise: Exercise;
  sessionInProgress: boolean;
}

export interface State extends fromRoot.State {
  training: TrainingState;
} 

const initialState: TrainingState = {
  exercises: [],
  finishedExercises: [],
  currentExercise: null,
  sessionInProgress: false
}

export function trainingReducer(state: TrainingState = initialState, action: TrainingActions) {
  switch(action.type) {
    case SET_EXERCISES:
      return {
        ...state,
        exercises: action.payload
      };
    case SET_FINISHED_EXERCISES:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case SET_CURRENT_EXERCISE:
      return {
        ...state,
        currentExercise: action.payload
      };
    case START_SESSION:
      return {
        ...state,
        currentExercise: action.payload,
      };
      case STOP_SESSION:
      return {
        ...state,
        currentExercise: null,
      };
    default: {
      return state
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getExercises = createSelector(getTrainingState, (state: TrainingState) => state.exercises);
export const getCurrentExercise = createSelector(getTrainingState, (state: TrainingState) => state.currentExercise);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getSessionInProgress = createSelector(getTrainingState, (state: TrainingState) => state.currentExercise != null);