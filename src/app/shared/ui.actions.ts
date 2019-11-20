import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

export const START_SESSION = '[UI] Start Session';
export const STOP_SESSION = '[UI] Stop Session';

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export class StartSession implements Action {
  readonly type = START_SESSION;
}

export class StopSession implements Action {
  readonly type = STOP_SESSION;
}

export type UIActions = StartLoading | StopLoading | StartSession | StopSession;