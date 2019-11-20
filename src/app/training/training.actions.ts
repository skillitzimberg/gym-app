import { Action } from '@ngrx/store';

export const START_SESSION = '[TRAINING] Start Session';
export const STOP_SESSION = '[TRAINING] Stop Session';

export class StartSession implements Action {
  readonly type = START_SESSION;
}

export class StopSession implements Action {
  readonly type = STOP_SESSION;
}

export type TRAININGActions = StartSession | StopSession;