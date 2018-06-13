import { all, put, select, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { addHandler, removeHandler } from '../store/timer/actions';
import { DISABLE_SHATTERING, ENABLE_SHATTERING, SHATTER } from '../store/shattering/types';
import { ApplicationState } from '../store';
import { shatterTCs } from '../utils/shattering';

const getShatterState = (state: ApplicationState) => state.shattering;

let delay = 0;

function* shatter(): SagaIterator {
  delay++;
  // Delay by 15 game ticks, to allow the game to run daily events
  if (delay >= 15) {
    delay = 0;

    const state = yield select(getShatterState);

    shatterTCs(state.focus, state.isTradingEnabled, state.isCraftingEnabled, state.targetCycle);
  }
}

function* enableShattering(): SagaIterator {
  yield put(addHandler(SHATTER));
}

function* disableShattering(): SagaIterator {
  yield put(removeHandler(SHATTER));
}

export default function* rootSaga() {
  yield all([
    takeLatest(SHATTER, shatter),
    takeLatest(ENABLE_SHATTERING, enableShattering),
    takeLatest(DISABLE_SHATTERING, disableShattering)
  ]);
}
