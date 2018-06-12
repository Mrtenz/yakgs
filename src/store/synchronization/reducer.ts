import { Reducer } from 'redux';
import {
  AutomationActions,
  LOAD_GAME,
  LOAD_GAME_FAILED,
  LOAD_GAME_SUCCEEDED,
  SAVE_GAME,
  SAVE_GAME_FAILED,
  SAVE_GAME_SUCCEEDED,
  SET_TOKEN,
  SynchronizationState,
  TEST_TOKEN,
  TEST_TOKEN_FAILED,
  TEST_TOKEN_SUCCEEDED
} from './types';

export const initialState: SynchronizationState = {
  isSynchronizing: false,
  isTesting: false,
  token: ''
};

const reducer: Reducer<SynchronizationState> = (
  state: SynchronizationState = initialState,
  action: AutomationActions
) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case TEST_TOKEN:
      return { ...state, isTesting: true };
    case TEST_TOKEN_SUCCEEDED:
      return { ...state, isTesting: false };
    case TEST_TOKEN_FAILED:
      return { ...state, isTesting: false };
    case LOAD_GAME:
      return { ...state, isSynchronizing: true };
    case LOAD_GAME_FAILED:
      return { ...state, isSynchronizing: false };
    case LOAD_GAME_SUCCEEDED:
      return { ...state, isSynchronizing: false };
    case SAVE_GAME:
      return { ...state, isSynchronizing: true };
    case SAVE_GAME_FAILED:
      return { ...state, isSynchronizing: false };
    case SAVE_GAME_SUCCEEDED:
      return { ...state, isSynchronizing: false };
    default:
      return state;
  }
};

export default reducer;
