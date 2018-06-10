import { all, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { addHandler, removeHandler } from '../store/timer/actions';
import {
  DISABLE_FEEDING,
  DISABLE_HUNTING,
  DISABLE_OBSERVING,
  DISABLE_PRAISING,
  ENABLE_FEEDING,
  ENABLE_HUNTING,
  ENABLE_OBSERVING,
  ENABLE_PRAISING,
  FEED,
  HUNT,
  OBSERVE,
  PRAISE
} from '../store/automation/types';

function* hunt(): SagaIterator {
  const catPower = game.resPool.get('manpower');
  if (catPower.value / catPower.maxValue > 0.95) {
    game.village.huntAll();
  }
}

function* enableHunting(): SagaIterator {
  yield put(addHandler(HUNT));
}

function* disableHunting(): SagaIterator {
  yield put(removeHandler(HUNT));
}

function* praise(): SagaIterator {
  game.religion.praise();
}

function* enablePraising(): SagaIterator {
  yield put(addHandler(PRAISE));
}

function* disablePraising(): SagaIterator {
  yield put(removeHandler(PRAISE));
}

function* observe(): SagaIterator {
  const button = document.getElementById('observeBtn');
  if (button) {
    button.click();
  }
}

function* enableObserving(): SagaIterator {
  yield put(addHandler(OBSERVE));
}

function* disableObserving(): SagaIterator {
  yield put(removeHandler(OBSERVE));
}

function* feed(): SagaIterator {
  const maxEnergy = game.religion.getZU('marker').val * 5 + 5;
  const energy = game.diplomacy.get('leviathans').energy;
  const necrocorns = game.resPool.get('necrocorn').value;

  if (necrocorns >= 1 && energy < maxEnergy) {
    game.diplomacy.feedElders();
  }
}

function* enableFeeding(): SagaIterator {
  yield put(addHandler(FEED));
}

function* disableFeeding(): SagaIterator {
  yield put(removeHandler(FEED));
}

export default function* rootSaga() {
  yield all([
    takeLatest(HUNT, hunt),
    takeLatest(ENABLE_HUNTING, enableHunting),
    takeLatest(DISABLE_HUNTING, disableHunting),
    takeLatest(PRAISE, praise),
    takeLatest(ENABLE_PRAISING, enablePraising),
    takeLatest(DISABLE_PRAISING, disablePraising),
    takeLatest(OBSERVE, observe),
    takeLatest(ENABLE_OBSERVING, enableObserving),
    takeLatest(DISABLE_OBSERVING, disableObserving),
    takeLatest(FEED, feed),
    takeLatest(ENABLE_FEEDING, enableFeeding),
    takeLatest(DISABLE_FEEDING, disableFeeding)
  ]);
}
