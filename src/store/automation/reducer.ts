import { Reducer } from 'redux';
import {
  AutomationActions,
  AutomationState,
  DISABLE_FEEDING,
  DISABLE_HUNTING,
  DISABLE_OBSERVING,
  DISABLE_PRAISING,
  ENABLE_FEEDING,
  ENABLE_HUNTING,
  ENABLE_OBSERVING,
  ENABLE_PRAISING
} from './types';

export const initialState: AutomationState = {
  isAutoHuntEnabled: false,
  isAutoPraiseEnabled: false,
  isAutoObserveEnabled: false,
  isAutoFeedEnabled: false
};

const reducer: Reducer<AutomationState> = (
  state: AutomationState = initialState,
  action: AutomationActions
) => {
  switch (action.type) {
    case ENABLE_HUNTING:
      return { ...state, isAutoHuntEnabled: true };
    case DISABLE_HUNTING:
      return { ...state, isAutoHuntEnabled: false };
    case ENABLE_PRAISING:
      return { ...state, isAutoPraiseEnabled: true };
    case DISABLE_PRAISING:
      return { ...state, isAutoPraiseEnabled: false };
    case ENABLE_OBSERVING:
      return { ...state, isAutoObserveEnabled: true };
    case DISABLE_OBSERVING:
      return { ...state, isAutoObserveEnabled: false };
    case ENABLE_FEEDING:
      return { ...state, isAutoFeedEnabled: true };
    case DISABLE_FEEDING:
      return { ...state, isAutoFeedEnabled: false };
    default:
      return state;
  }
};

export default reducer;
