/**
 * This code can probably be optimized and/or simplified.
 */

const upgrades = [
  'unicornTomb',
  'ivoryTower',
  'ivoryCitadel',
  'skyPalace',
  'unicornUtopia',
  'sunspire'
];

export interface UnicornData {
  ups: string;
  towerEffect: string;
  effectiveUps: string;
  mostEfficient: string;
  resource: {
    label: string;
    current: string;
    cost: string;
    time: string;
  };
}

export const calculate = (): UnicornData => {
  const unicornSelection = game.workshop.get('unicornSelection').researched;
  const unicornmancy = game.prestige.getPerk('unicornmancy').researched;

  const pastureMetadata = getPastureMetadata();
  const upgradeMetadata = getUpgradeMetadata();

  let totalBonus = 0;
  Object.keys(upgradeMetadata).forEach(key => {
    totalBonus += upgradeMetadata[key].bonus * upgradeMetadata[key].value;
  });

  const baseUps = pastureMetadata.value * 0.005 * (unicornSelection ? 1.25 : 1);
  const displayedUps = baseUps * (1 + totalBonus) * getBonusMultiplier();
  const bonusPerTower = ((500 * 0.0005) / 2) * (unicornmancy ? 1.1 : 1);
  const towerEffect = Math.min(
    500 / 2,
    upgradeMetadata['ivoryTower'].value * bonusPerTower * (unicornSelection ? 1.1 : 1)
  );
  const ups = displayedUps + towerEffect;

  const check = Object.assign({ unicornPasture: pastureMetadata }, upgradeMetadata);
  let lowestAmorization = Infinity;
  let lowest: any = null;
  Object.keys(check).forEach(key => {
    const item = check[key];
    const itemBaseUps =
      (item.name === 'unicornPasture' ? item.value + 1 : check['unicornPasture'].value) *
      0.005 *
      (unicornSelection ? 1.25 : 1);
    const itemBonus = totalBonus + item.bonus;
    const itemDisplayedUps = itemBaseUps * (1 + itemBonus) * getBonusMultiplier();
    const towerEffect = Math.min(
      500 / 2,
      (item.name === 'ivoryTower' ? item.value + 1 : check['ivoryTower'].value) *
        bonusPerTower *
        (unicornSelection ? 1.1 : 1)
    );
    const itemUps = itemDisplayedUps + towerEffect;
    const itemUpsIncrease = itemUps - ups;

    item.amorization = item.unicornCost / itemUpsIncrease / 3600;

    if (item.amorization < lowestAmorization) {
      lowest = item;
      lowestAmorization = item.amorization;
    }
  });

  let resource;
  let itemsLeft;
  let timeLeft;
  if (lowest.name === 'unicornPasture') {
    resource = 'unicorns';
    itemsLeft = lowest.unicornCost - game.resPool.get('unicorns').value;
    timeLeft = itemsLeft / ups;
    if (timeLeft <= 0) {
      timeLeft = '0s ';
    } else {
      timeLeft = game.toDisplaySeconds(timeLeft);
    }
  } else {
    resource = 'tears';
    itemsLeft = lowest.tearCost - game.resPool.get('tears').value;
    timeLeft =
      (Math.ceil((itemsLeft * 2500) / game.bld.get('ziggurat').val / 2500) * 2500 -
        game.resPool.get('unicorns').value) /
      ups;
    if (timeLeft <= 0) {
      timeLeft = '0s ';
    } else {
      timeLeft = game.toDisplaySeconds(timeLeft);
    }
  }

  return {
    ups: displayedUps.toFixed(2),
    towerEffect: towerEffect.toFixed(2),
    effectiveUps: ups.toFixed(2),
    mostEfficient: lowest.label,
    resource: {
      label: resource,
      current: game.getDisplayValueExt(game.resPool.get(resource).value),
      cost: game.getDisplayValueExt(resource === 'unicorns' ? lowest.unicornCost : lowest.tearCost),
      time: timeLeft
    }
  };
};

const getUpgradeMetadata = () => {
  const metadata: any = {};
  const ziggurats = game.bld.get('ziggurat').val === 0 ? 1 : game.bld.get('ziggurat').val;
  upgrades.forEach(upgrade => {
    const data = game.religion.getZU(upgrade);
    const tears = data.prices.find((price: any) => price.name === 'tears').val;
    const tearCost = tears * Math.pow(data.priceRatio, data.val);
    metadata[upgrade] = {
      name: data.name,
      label: data.label,
      initialPrice: tears,
      priceRatio: data.priceRatio,
      unicornCost: (tearCost / ziggurats) * 2500,
      tearCost: tearCost,
      value: data.val,
      bonus: data.effects['unicornsRatioReligion']
    };
  });
  return metadata;
};

const getPastureMetadata = () => {
  const pasture = game.bld.get('unicornPasture');
  const unicornCost =
    pasture.prices[0].val * Math.pow(game.bld.getPriceRatio('unicornPasture'), pasture.val);
  const ziggurats = game.bld.get('ziggurat').val === 0 ? 1 : game.bld.get('ziggurat').val;
  return {
    name: 'unicornPasture',
    label: pasture.label,
    initialPrice: pasture.prices[0].val,
    priceRatio: game.bld.getPriceRatio('unicornPasture'),
    value: pasture.val,
    unicornCost: unicornCost,
    tearCost: (unicornCost / 2500) * ziggurats,
    bonus: 0
  };
};

const getBonusMultiplier = () => {
  return (
    (1 + game.religion.getProductionBonus() / 100) * (1 + game.prestige.getParagonProductionRatio())
  );
};
