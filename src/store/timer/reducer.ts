import { TimerActions, TimerState } from './types';
import { Reducer } from 'redux';

export const initialState: TimerState = {
  handlers: []
};

const reducer: Reducer<TimerState> = (state: TimerState = initialState, action: TimerActions) => {
  switch (action.type) {
    case 'ADD_HANDLER':
      return { ...state, handlers: [...state.handlers, action.payload] };
    case 'REMOVE_HANDLER':
      const handlers = state.handlers.filter(handler => handler !== action.payload);
      return { ...state, handlers };
    default:
      return state;
  }
};

export default reducer;
