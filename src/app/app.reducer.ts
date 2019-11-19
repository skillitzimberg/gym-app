export interface State {
  isLoading: boolean
}

export interface Action {
  type: string
}

const initialState: State = {
  isLoading: false
}

export function appReducer(state: State = initialState, action: Action) {
  switch(action.type) {
    case 'START_LOADING':
      return {
        isLoading: true
      };
    case 'STOP_LOADING':
      return {
        isLoading: false
      };
    default: {
      return state
    }
  }
}