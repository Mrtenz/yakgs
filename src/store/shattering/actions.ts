import { ActionCreator } from 'redux';
import {
  DISABLE_SHATTERING,
  DisableShatteringAction,
  ENABLE_SHATTERING,
  EnableShatteringAction,
  Focus,
  FocusSetAction,
  SET_DELAY,
  SET_FOCUS,
  SET_TARGET_CYCLE,
  SetDelayAction,
  SetTargetCycleAction,
  TOGGLE_CRAFTING,
  TOGGLE_TRADING,
  ToggleCraftingAction,
  ToggleTradingAction
} from './types';

export const setFocus: ActionCreator<FocusSetAction> = (focus: Focus) => ({
  type: SET_FOCUS,
  payload: focus
});

export const enableShattering: ActionCreator<EnableShatteringAction> = () => ({
  type: ENABLE_SHATTERING
});

export const disableShattering: ActionCreator<DisableShatteringAction> = () => ({
  type: DISABLE_SHATTERING
});

export const toggleTrading: ActionCreator<ToggleTradingAction> = () => ({
  type: TOGGLE_TRADING
});

export const toggleCrafting: ActionCreator<ToggleCraftingAction> = () => ({
  type: TOGGLE_CRAFTING
});

export const setTargetCycle: ActionCreator<SetTargetCycleAction> = (cycle: string) => ({
  type: SET_TARGET_CYCLE,
  payload: cycle
});

export const setDelay: ActionCreator<SetDelayAction> = (delay: number) => ({
  type: SET_DELAY,
  payload: delay
});
