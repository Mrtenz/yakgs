import { Action } from 'redux';

export interface TimerState {
  handlers: string[];
}

export const ADD_HANDLER = 'ADD_HANDLER';
export const REMOVE_HANDLER = 'REMOVE_HANDLER';

export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const TICK_TIMER = 'TICK_TIMER';

export interface AddHandlerAction extends Action {
  type: typeof ADD_HANDLER;
  payload: string;
}

export interface RemoveHandlerAction extends Action {
  type: typeof REMOVE_HANDLER;
  payload: string;
}

export interface StartTimerAction extends Action {
  type: typeof START_TIMER;
}

export interface StopTimerAction extends Action {
  type: typeof STOP_TIMER;
}

export interface TickTimerAction extends Action {
  type: typeof TICK_TIMER;
}

export type TimerActions =
  | AddHandlerAction
  | RemoveHandlerAction
  | StartTimerAction
  | StopTimerAction;
