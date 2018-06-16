import { Reducer } from 'redux';
import {
  Focus,
  SET_FOCUS,
  ShatteringActions,
  ShatteringState,
  TOGGLE_CRAFTING,
  ENABLE_SHATTERING,
  TOGGLE_TRADING,
  DISABLE_SHATTERING,
  SET_TARGET_CYCLE,
  SET_DELAY
} from './types';

export const initialState: ShatteringState = {
  isEnabled: false,
  isTradingEnabled: true,
  isCraftingEnabled: true,
  focus: Focus.TIME_CRYSTALS,
  targetCycle: 'none',
  delay: 15
};

const reducer: Reducer<ShatteringState> = (
  state: ShatteringState = initialState,
  action: ShatteringActions
) => {
  switch (action.type) {
    case SET_FOCUS:
      return { ...state, focus: action.payload };
    case ENABLE_SHATTERING:
      return { ...state, isEnabled: true };
    case DISABLE_SHATTERING:
      return { ...state, isEnabled: false };
    case TOGGLE_TRADING:
      return { ...state, isTradingEnabled: !state.isTradingEnabled };
    case TOGGLE_CRAFTING:
      return { ...state, isCraftingEnabled: !state.isCraftingEnabled };
    case SET_TARGET_CYCLE:
      return { ...state, targetCycle: action.payload };
    case SET_DELAY:
      return { ...state, delay: action.payload };
    default:
      return state;
  }
};

export default reducer;
