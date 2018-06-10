import { Action } from 'redux';

export interface ShatteringState {
  isEnabled: boolean;
  isTradingEnabled: boolean;
  isCraftingEnabled: boolean;
  focus: Focus;
}

export enum Focus {
  ELUDIUM = 'ELUDIUM',
  TIME_CRYSTALS = 'TIME_CRYSTALS',
  BALANCE = 'BALANCE'
}

export const SET_FOCUS = 'SET_FOCUS';

export const ENABLE_SHATTERING = 'ENABLE_SHATTERING';
export const DISABLE_SHATTERING = 'DISABLE_SHATTERING';
export const SHATTER = 'SHATTER';

export const TOGGLE_TRADING = 'TOGGLE_TRADING';
export const TOGGLE_CRAFTING = 'TOGGLE_CRAFTING';

export interface FocusSetAction extends Action {
  type: typeof SET_FOCUS;
  payload: Focus;
}

export interface EnableShatteringAction extends Action {
  type: typeof ENABLE_SHATTERING;
}

export interface DisableShatteringAction extends Action {
  type: typeof DISABLE_SHATTERING;
}

export interface ToggleTradingAction extends Action {
  type: typeof TOGGLE_TRADING;
}

export interface ToggleCraftingAction extends Action {
  type: typeof TOGGLE_CRAFTING;
}

export type ShatteringActions =
  | FocusSetAction
  | EnableShatteringAction
  | DisableShatteringAction
  | ToggleTradingAction
  | ToggleCraftingAction;
