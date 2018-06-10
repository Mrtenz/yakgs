import { all, put, select, takeLatest } from 'redux-saga/effects';
import { CRAFT, DISABLE_CRAFTING, ENABLE_CRAFTING } from '../store/crafting/types';
import { SagaIterator } from 'redux-saga';
import { addHandler, removeHandler } from '../store/timer/actions';
import { ApplicationState } from '../store';

const getSelectedItems = (state: ApplicationState) => state.crafting.selectedItems;

const hasEnough = (price: any): boolean => {
  const resource = game.resPool.get(price.name);
  return (
    resource.value > price.val &&
    (resource.maxValue === 0 || resource.value / resource.maxValue > 0.95)
  );
};

function* craft(): SagaIterator {
  const selectedItems: string[] = yield select(getSelectedItems);

  selectedItems.forEach(selectedItem => {
    const item = game.workshop.getCraft(selectedItem);
    if (item.prices.some(hasEnough)) {
      game.workshop.craftAll(item.name);
    }
  });
}

function* enableCrafting(): SagaIterator {
  yield put(addHandler(CRAFT));
}

function* disableCrafting(): SagaIterator {
  yield put(removeHandler(CRAFT));
}

export default function* rootSaga() {
  yield all([
    takeLatest(CRAFT, craft),
    takeLatest(ENABLE_CRAFTING, enableCrafting),
    takeLatest(DISABLE_CRAFTING, disableCrafting)
  ]);
}
