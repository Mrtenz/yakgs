import { Reducer } from 'redux';
import {
  ADD_PENDING_NOTIFICATION,
  ADD_RESOURCE_TRIGGER,
  CLEAR_PENDING_NOTIFICATIONS,
  DISABLE_NOTIFICATIONS,
  ENABLE_NOTIFICATIONS,
  NotificationsActions,
  NotificationsState,
  REMOVE_RESOURCE_TRIGGER
} from './types';

export const initialState: NotificationsState = {
  isEnabled: false,
  triggers: {
    resources: []
  },
  pending: []
};

const reducer: Reducer<NotificationsState> = (
  state: NotificationsState = initialState,
  action: NotificationsActions
) => {
  switch (action.type) {
    case ENABLE_NOTIFICATIONS:
      return { ...state, isEnabled: true };
    case DISABLE_NOTIFICATIONS:
      return { ...state, isEnabled: false };
    case ADD_PENDING_NOTIFICATION:
      return { ...state, pending: [...state.pending, action.payload] };
    case CLEAR_PENDING_NOTIFICATIONS:
      return { ...state, pending: [] };
    case ADD_RESOURCE_TRIGGER:
      return {
        ...state,
        triggers: {
          ...state.triggers,
          resources: [...state.triggers.resources, action.payload]
        }
      };
    case REMOVE_RESOURCE_TRIGGER:
      const resources = state.triggers.resources.filter(resource => resource !== action.payload);
      return {
        ...state,
        triggers: {
          ...state.triggers,
          resources
        }
      };
    default:
      return state;
  }
};

export default reducer;
