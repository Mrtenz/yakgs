import { Reducer } from 'redux';
import {
  Focus,
  SET_FOCUS,
  ShatteringActions,
  ShatteringState,
  TOGGLE_CRAFTING,
  ENABLE_SHATTERING,
  TOGGLE_TRADING,
  DISABLE_SHATTERING
} from './types';

export const initialState: ShatteringState = {
  isEnabled: false,
  isTradingEnabled: true,
  isCraftingEnabled: true,
  focus: Focus.TIME_CRYSTALS
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
    default:
      return state;
  }
};

export default reducer;
