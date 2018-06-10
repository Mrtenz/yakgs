import { ActionCreator } from 'redux';
import {
  ADD_HANDLER,
  AddHandlerAction,
  REMOVE_HANDLER,
  RemoveHandlerAction,
  START_TIMER,
  StartTimerAction,
  STOP_TIMER,
  StopTimerAction,
  TICK_TIMER,
  TickTimerAction
} from './types';

export const addHandler: ActionCreator<AddHandlerAction> = (name: string) => ({
  type: ADD_HANDLER,
  payload: name
});

export const removeHandler: ActionCreator<RemoveHandlerAction> = (name: string) => ({
  type: REMOVE_HANDLER,
  payload: name
});

export const startTimer: ActionCreator<StartTimerAction> = () => ({
  type: START_TIMER
});

export const stopTimer: ActionCreator<StopTimerAction> = () => ({
  type: STOP_TIMER
});

export const tickTimer: ActionCreator<TickTimerAction> = () => ({
  type: TICK_TIMER
});
