import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { addHandler, removeHandler } from '../store/timer/actions';
import {
  DISABLE_NOTIFICATIONS,
  ENABLE_NOTIFICATIONS,
  NOTIFY,
  PendingNotification,
  Triggers
} from '../store/notifications/types';
import { addPendingNotification, clearPendingNotifications } from '../store/notifications/actions';
import { ApplicationState } from '../store';
import * as icon from '../assets/images/icon.png';

const getTriggers = (state: ApplicationState) => state.notifications.triggers;

const getPendingNotifications = (state: ApplicationState) => state.notifications.pending;

const isPending = (pending: PendingNotification[], type: string) => {
  return !!pending.find(pending => pending.type === type);
};

const createNotification = (body: string): Notification => {
  return new Notification('Kittens Game', {
    body,
    icon
  });
};

function* notify(): SagaIterator {
  if (document.hasFocus()) {
    yield put(clearPendingNotifications());
    return;
  }

  const triggers: Triggers = yield select(getTriggers);
  const pending: PendingNotification[] = yield select(getPendingNotifications);

  // Resources
  for (let i = 0; i < triggers.resources.length; i++) {
    const resource = triggers.resources[i];
    if (!isPending(pending, `${resource}-full`)) {
      const gameResource = game.resPool.get(resource);
      if (gameResource.value / gameResource.maxValue > 0.95) {
        yield put(
          addPendingNotification({
            notification: createNotification(
              `Your ${gameResource.title} storage is (almost) full!`
            ),
            type: `${resource}-full`
          })
        );
      }
    }
  }
}

function* enableNotifications(): SagaIterator {
  const permission = yield call(Notification.requestPermission);
  if (permission === 'granted') {
    yield put(addHandler(NOTIFY));
  } else {
    yield put({ type: DISABLE_NOTIFICATIONS });
  }
}

function* disableNotifications(): SagaIterator {
  yield put(removeHandler(NOTIFY));
}

export default function* rootSaga() {
  yield all([
    takeLatest(NOTIFY, notify),
    takeLatest(ENABLE_NOTIFICATIONS, enableNotifications),
    takeLatest(DISABLE_NOTIFICATIONS, disableNotifications)
  ]);
}
