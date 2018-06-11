import { all, put, select, takeLatest } from 'redux-saga/effects';
import { CRAFT, DISABLE_CRAFTING, ENABLE_CRAFTING } from '../store/crafting/types';
import { SagaIterator } from 'redux-saga';
import { addHandler, removeHandler } from '../store/timer/actions';
import { ApplicationState } from '../store';

const getSelectedItems = (state: ApplicationState) => state.crafting.selectedItems;

const getRequirements = (state: ApplicationState) => state.crafting.requirements;

const hasEnough = (price: any): boolean => {
  const resource = game.resPool.get(price.name);
  return (
    resource.value > price.val &&
    (resource.maxValue === 0 || resource.value / resource.maxValue > 0.95)
  );
};

const meetsRequirements = (requirements: { [name: string]: number }): boolean => {
  return !Object.keys(requirements).some(key => {
    const required = requirements[key];
    const current = game.resPool.get(key).value;

    return required >= current;
  });
};

function* craft(): SagaIterator {
  const selectedItems: string[] = yield select(getSelectedItems);
  const requirements = yield select(getRequirements);

  selectedItems.forEach(selectedItem => {
    const item = game.workshop.getCraft(selectedItem);

    const itemRequirements = requirements[item.name];

    if ((!itemRequirements || meetsRequirements(itemRequirements)) && item.prices.some(hasEnough)) {
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
