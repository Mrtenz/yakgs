import { ActionCreator } from 'redux';
import {
  ADD_ITEM,
  AddItemAction,
  DISABLE_CRAFTING,
  DisableCraftingAction,
  ENABLE_CRAFTING,
  EnableCraftingAction,
  REMOVE_ITEM,
  RemoveItemAction,
  RESET_REQUIREMENTS,
  ResetRequirementsAction,
  SET_REQUIREMENTS,
  SetRequirementsAction
} from './types';

export const addItem: ActionCreator<AddItemAction> = (item: string) => ({
  type: ADD_ITEM,
  payload: item
});

export const removeItem: ActionCreator<RemoveItemAction> = (item: string) => ({
  type: REMOVE_ITEM,
  payload: item
});

export const enableCrafting: ActionCreator<EnableCraftingAction> = () => ({
  type: ENABLE_CRAFTING
});

export const disableCrafting: ActionCreator<DisableCraftingAction> = () => ({
  type: DISABLE_CRAFTING
});

export const setRequirements: ActionCreator<SetRequirementsAction> = (
  name: string,
  requirements: { [name: string]: number }
) => ({
  type: SET_REQUIREMENTS,
  payload: { name, requirements }
});

export const resetRequirements: ActionCreator<ResetRequirementsAction> = (name: string) => ({
  type: RESET_REQUIREMENTS,
  payload: name
});
