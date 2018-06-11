import { applyMiddleware, createStore, Store } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import createSagaMiddleware from 'redux-saga';
import { ApplicationState, reducers } from './index';
import sagas from '../sagas';
import { startTimer, tickTimer } from './timer/actions';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Persistor } from 'redux-persist/es/types';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

/**
 * Bind game timer to Redux.
 * @param {Store<ApplicationState>} store
 */
const setupYakgs = (store: Store<ApplicationState>) => {
  setTimeout(() => {
    store.dispatch(startTimer());
    game.timer.addEvent(() => store.dispatch(tickTimer()), 1);
  }, 1000);
};

const configureStore = (
  history: History
): { store: Store<ApplicationState>; persistor: Persistor } => {
  const composeEnhancers = composeWithDevTools({
    actionsBlacklist: ['TICK_TIMER']
  });

  const persistedReducer = persistReducer(
    {
      key: 'redux',
      storage,
      stateReconciler: autoMergeLevel2
    },
    reducers as any
  );

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore<ApplicationState>(
    persistedReducer as any,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );

  Object.keys(sagas).forEach((saga: string) => {
    sagaMiddleware.run((sagas as any)[saga], store.dispatch);
  });

  setupYakgs(store);

  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
