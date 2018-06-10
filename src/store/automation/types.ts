import { Action } from 'redux';

export interface AutomationState {
  isAutoHuntEnabled: boolean;
  isAutoPraiseEnabled: boolean;
  isAutoObserveEnabled: boolean;
  isAutoFeedEnabled: boolean;
}

export const ENABLE_HUNTING = 'ENABLE_HUNTING';
export const DISABLE_HUNTING = 'DISABLE_HUNTING';
export const HUNT = 'HUNT';

export const ENABLE_PRAISING = 'ENABLE_PRAISING';
export const DISABLE_PRAISING = 'DISABLE_PRAISING';
export const PRAISE = 'PRAISE';

export const ENABLE_OBSERVING = 'ENABLE_OBSERVING';
export const DISABLE_OBSERVING = 'DISABLE_OBSERVING';
export const OBSERVE = 'OBSERVE';

export const ENABLE_FEEDING = 'ENABLE_FEEDING';
export const DISABLE_FEEDING = 'DISABLE_FEEDING';
export const FEED = 'FEED';

export interface EnableHuntingAction extends Action {
  type: typeof ENABLE_HUNTING;
}

export interface DisableHuntingAction extends Action {
  type: typeof DISABLE_HUNTING;
}

export interface EnablePraisingAction extends Action {
  type: typeof ENABLE_PRAISING;
}

export interface DisablePraisingAction extends Action {
  type: typeof DISABLE_PRAISING;
}

export interface EnableObservingAction extends Action {
  type: typeof ENABLE_OBSERVING;
}

export interface DisableObservingAction extends Action {
  type: typeof DISABLE_OBSERVING;
}

export interface EnableFeedingAction extends Action {
  type: typeof ENABLE_FEEDING;
}

export interface DisableFeedingAction extends Action {
  type: typeof DISABLE_FEEDING;
}

export type AutomationActions =
  | EnableHuntingAction
  | DisableHuntingAction
  | EnablePraisingAction
  | DisablePraisingAction
  | EnableObservingAction
  | DisableObservingAction
  | EnableFeedingAction
  | DisableFeedingAction;
