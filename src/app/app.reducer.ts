import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromTraining from './training/training.reducer';

export interface State {
  ui: fromUi.State;
  training: fromTraining.State
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  training: fromTraining.trainingReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getTrainingState = createFeatureSelector<fromTraining.State>('training');
export const getSessionInProgress = createSelector(getTrainingState, fromTraining.getSessionInProgress);