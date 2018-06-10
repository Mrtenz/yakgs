import { ActionCreator } from 'redux';
import {
  DISABLE_FEEDING,
  DISABLE_HUNTING,
  DISABLE_OBSERVING,
  DISABLE_PRAISING,
  DisableFeedingAction,
  DisableHuntingAction,
  DisableObservingAction,
  DisablePraisingAction,
  ENABLE_FEEDING,
  ENABLE_HUNTING,
  ENABLE_OBSERVING,
  ENABLE_PRAISING,
  EnableFeedingAction,
  EnableHuntingAction,
  EnableObservingAction,
  EnablePraisingAction
} from './types';

export const enableHunting: ActionCreator<EnableHuntingAction> = () => ({
  type: ENABLE_HUNTING
});

export const disableHunting: ActionCreator<DisableHuntingAction> = () => ({
  type: DISABLE_HUNTING
});

export const enablePraising: ActionCreator<EnablePraisingAction> = () => ({
  type: ENABLE_PRAISING
});

export const disablePraising: ActionCreator<DisablePraisingAction> = () => ({
  type: DISABLE_PRAISING
});

export const enableObserving: ActionCreator<EnableObservingAction> = () => ({
  type: ENABLE_OBSERVING
});

export const disableObserving: ActionCreator<DisableObservingAction> = () => ({
  type: DISABLE_OBSERVING
});

export const enableFeeding: ActionCreator<EnableFeedingAction> = () => ({
  type: ENABLE_FEEDING
});

export const disableFeeding: ActionCreator<DisableFeedingAction> = () => ({
  type: DISABLE_FEEDING
});
