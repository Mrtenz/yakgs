import { ActionCreator } from 'redux';
import {
  LOAD_GAME,
  LOAD_GAME_FAILED,
  LOAD_GAME_SUCCEEDED,
  LoadGameAction,
  LoadGameFailedAction,
  LoadGameSucceededAction,
  SAVE_GAME,
  SAVE_GAME_FAILED,
  SAVE_GAME_SUCCEEDED,
  SaveGameAction,
  SaveGameFailedAction,
  SaveGameSucceededAction,
  SET_TOKEN,
  SetTokenAction,
  TEST_TOKEN,
  TEST_TOKEN_FAILED,
  TEST_TOKEN_SUCCEEDED,
  TestTokenAction,
  TestTokenFailedAction,
  TestTokenSucceededAction
} from './types';

export const setToken: ActionCreator<SetTokenAction> = (token: string) => ({
  type: SET_TOKEN,
  payload: token
});

export const testToken: ActionCreator<TestTokenAction> = () => ({
  type: TEST_TOKEN
});

export const testTokenSucceeded: ActionCreator<TestTokenSucceededAction> = () => ({
  type: TEST_TOKEN_SUCCEEDED
});

export const testTokenFailed: ActionCreator<TestTokenFailedAction> = () => ({
  type: TEST_TOKEN_FAILED
});

export const loadGame: ActionCreator<LoadGameAction> = () => ({
  type: LOAD_GAME
});

export const loadGameSucceeded: ActionCreator<LoadGameSucceededAction> = (save: string) => ({
  type: LOAD_GAME_SUCCEEDED,
  payload: save
});

export const loadGameFailed: ActionCreator<LoadGameFailedAction> = (save: string) => ({
  type: LOAD_GAME_FAILED,
  payload: save
});

export const saveGame: ActionCreator<SaveGameAction> = () => ({
  type: SAVE_GAME
});

export const saveGameSucceeded: ActionCreator<SaveGameSucceededAction> = (save: string) => ({
  type: SAVE_GAME_SUCCEEDED,
  paysave: save
});

export const saveGameFailed: ActionCreator<SaveGameFailedAction> = (save: string) => ({
  type: SAVE_GAME_FAILED,
  paysave: save
});
