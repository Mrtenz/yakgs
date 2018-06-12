import { Action } from 'redux';

export interface SynchronizationState {
  isSynchronizing: boolean;
  isTesting: boolean;
  token: string;
}

export const SET_TOKEN = 'SET_TOKEN';

export const TEST_TOKEN = 'TEST_TOKEN';
export const TEST_TOKEN_FAILED = 'TEST_TOKEN_FAILED';
export const TEST_TOKEN_SUCCEEDED = 'TEST_TOKEN_SUCCEEDED';

export const LOAD_GAME = 'LOAD_GAME';
export const LOAD_GAME_FAILED = 'LOAD_GAME_FAILED';
export const LOAD_GAME_SUCCEEDED = 'LOAD_GAME_SUCCEEDED';

export const SAVE_GAME = 'SAVE_GAME';
export const SAVE_GAME_FAILED = 'SAVE_GAME_FAILED';
export const SAVE_GAME_SUCCEEDED = 'SAVE_GAME_SUCCEEDED';

export interface SetTokenAction extends Action {
  type: typeof SET_TOKEN;
  payload: string;
}

export interface TestTokenAction extends Action {
  type: typeof TEST_TOKEN;
}

export interface TestTokenFailedAction extends Action {
  type: typeof TEST_TOKEN_FAILED;
}

export interface TestTokenSucceededAction extends Action {
  type: typeof TEST_TOKEN_SUCCEEDED;
}

export interface LoadGameAction extends Action {
  type: typeof LOAD_GAME;
}

export interface LoadGameFailedAction extends Action {
  type: typeof LOAD_GAME_FAILED;
}

export interface LoadGameSucceededAction extends Action {
  type: typeof LOAD_GAME_SUCCEEDED;
  payload: string;
}

export interface SaveGameAction extends Action {
  type: typeof SAVE_GAME;
}

export interface SaveGameFailedAction extends Action {
  type: typeof SAVE_GAME_FAILED;
}

export interface SaveGameSucceededAction extends Action {
  type: typeof SAVE_GAME_SUCCEEDED;
}

export type AutomationActions =
  | SetTokenAction
  | TestTokenAction
  | TestTokenFailedAction
  | TestTokenSucceededAction
  | LoadGameAction
  | LoadGameFailedAction
  | LoadGameSucceededAction
  | SaveGameAction
  | SaveGameFailedAction
  | SaveGameSucceededAction;
