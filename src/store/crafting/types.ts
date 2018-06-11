import { Action } from 'redux';

export interface CraftingState {
  isEnabled: boolean;
  selectedItems: string[];
  requirements: { [name: string]: { [name: string]: number } };
}

export interface Item {
  name: string;
  label: string;
}

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const ENABLE_CRAFTING = 'ENABLE_CRAFTING';
export const DISABLE_CRAFTING = 'DISABLE_CRAFTING';

export const SET_REQUIREMENTS = 'SET_REQUIREMENTS';
export const RESET_REQUIREMENTS = 'RESET_REQUIREMENTS';

export const CRAFT = 'CRAFT';

export interface AddItemAction extends Action {
  type: typeof ADD_ITEM;
  payload: string;
}

export interface RemoveItemAction extends Action {
  type: typeof REMOVE_ITEM;
  payload: string;
}

export interface EnableCraftingAction extends Action {
  type: typeof ENABLE_CRAFTING;
}

export interface DisableCraftingAction extends Action {
  type: typeof DISABLE_CRAFTING;
}

export interface SetRequirementsAction extends Action {
  type: typeof SET_REQUIREMENTS;
  payload: {
    name: string;
    requirements: { [name: string]: number };
  };
}

export interface ResetRequirementsAction extends Action {
  type: typeof RESET_REQUIREMENTS;
  payload: string;
}

export type CraftingActions =
  | AddItemAction
  | RemoveItemAction
  | EnableCraftingAction
  | DisableCraftingAction
  | SetRequirementsAction
  | ResetRequirementsAction;
