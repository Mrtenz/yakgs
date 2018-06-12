import { combineReducers, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import { Dispatch } from 'react-redux';
import { TimerState } from './timer/types';
import timerReducer from './timer/reducer';
import { ShatteringState } from './shattering/types';
import shatteringReducer from './shattering/reducer';
import { CraftingState } from './crafting/types';
import craftingReducer from './crafting/reducer';
import { AutomationState } from './automation/types';
import automationReducer from './automation/reducer';
import { SynchronizationState } from './synchronization/types';
import synchronizationReducer from './synchronization/reducer';

export interface ApplicationState {
  timer: TimerState;
  shattering: ShatteringState;
  crafting: CraftingState;
  automation: AutomationState;
  synchronization: SynchronizationState;
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  timer: timerReducer,
  shattering: shatteringReducer,
  crafting: craftingReducer,
  automation: automationReducer,
  synchronization: synchronizationReducer,
  router: routerReducer
});

export interface ConnectedReduxProps<S> {
  dispatch: Dispatch<S>;
}
