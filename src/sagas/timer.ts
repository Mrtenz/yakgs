import { all, cancel, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { START_TIMER, STOP_TIMER, TICK_TIMER } from '../store/timer/types';
import { SagaIterator } from 'redux-saga';
import { ApplicationState } from '../store';

const getHandlers = (state: ApplicationState): string[] => state.timer.handlers;

function* timer (): SagaIterator {
  while (true) {
    yield take(TICK_TIMER);

    const handlers = yield select(getHandlers);
    for (let i = 0; i < handlers.length; i++) {
      yield put({ type: handlers[i] });
    }
  }
}

function* startTimer (): SagaIterator {
  const task = yield fork(timer);
  yield take(STOP_TIMER);
  yield cancel(task);
}

export default function* rootSaga () {
  yield all([takeLatest(START_TIMER, startTimer)]);
}
