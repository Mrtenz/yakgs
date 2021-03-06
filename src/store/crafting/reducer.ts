import { Reducer } from 'redux';
import {
  ADD_ITEM,
  CraftingActions,
  CraftingState,
  DISABLE_CRAFTING,
  ENABLE_CRAFTING,
  REMOVE_ITEM,
  RESET_REQUIREMENTS,
  SET_REQUIREMENTS
} from './types';

export const initialState: CraftingState = {
  isEnabled: false,
  selectedItems: [],
  requirements: {}
};

const reducer: Reducer<CraftingState> = (
  state: CraftingState = initialState,
  action: CraftingActions
) => {
  switch (action.type) {
    case ENABLE_CRAFTING:
      return { ...state, isEnabled: true };
    case DISABLE_CRAFTING:
      return { ...state, isEnabled: false };
    case ADD_ITEM:
      return { ...state, selectedItems: [...state.selectedItems, action.payload] };
    case REMOVE_ITEM:
      const items = state.selectedItems.filter(item => item !== action.payload);
      return { ...state, selectedItems: items };
    case SET_REQUIREMENTS:
      return {
        ...state,
        requirements: { ...state.requirements, [action.payload.name]: action.payload.requirements }
      };
    case RESET_REQUIREMENTS:
      const { [action.payload]: value, ...requirements } = state.requirements;
      return { ...state, requirements };
    default:
      return state;
  }
};

export default reducer;
