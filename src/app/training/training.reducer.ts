import { TRAININGActions, START_SESSION, STOP_SESSION } from './training.actions';

export interface State {
  sessionInProgress: boolean
}

const initialState: State = {
  sessionInProgress: false
}

export function trainingReducer(state: State = initialState, action: TRAININGActions) {
  switch(action.type) {
    case START_SESSION:
      return {
        sessionInProgress: true
      };
    case STOP_SESSION:
      return {
        sessionInProgress: false
      };
    default: {
      return state
    }
  }
}

export const getSessionInProgress = (state: State) => state.sessionInProgress;