import { Focus } from '../store/shattering/types';

const getShatterCost = () => {
  const shatterButton = game.timeTab.cfPanel.children[0].children.find(
    (child: any) => child.opts.name === 'Combust TC'
  );
  return shatterButton.controller.getPricesMultiple(shatterButton.model, 1);
};

export const getTradeAmount = () => {
  const leviathans = game.diplomacy.get('leviathans');
  const ratio = game.diplomacy.getTradeRatio();
  const trade = leviathans.sells[0];
  const minimum = trade.value - (trade.value * trade.delta) / 2;
  let amount = minimum + game.rand(trade.value * trade.delta);

  amount += amount * ratio;
  amount += amount * 0.02 * leviathans.energy;
  return amount;
};

export const getUnobtainiumPerShatter = () => {
  const unobtainium = game.resPool.get('unobtainium');
  const shatterGain = game.getEffect('shatterTCGain') * (1 + game.getEffect('rrRatio'));
  return (
    game.getResourcePerTick(unobtainium.name, true) *
    ((1 / game.calendar.dayPerTick) * game.calendar.daysPerSeason * 4) *
    shatterGain
  );
};

const trade = (times: number) => {
  const leviathans = game.diplomacy.get('leviathans');
  if (times === -1) {
    game.diplomacy.tradeAll(leviathans);
  } else {
    game.diplomacy.tradeMultiple(leviathans, times);
  }
};

const craft = (times: number) => {
  if (times === -1) {
    game.workshop.craftAll('eludium');
  } else {
    game.workshop.craft('eludium', times);
  }
};

export const shatterTCs = (
  focus: Focus,
  isTradingEnabled: boolean,
  isCraftingEnabled: boolean
): void => {
  const heat = game.time.heat;
  const maxHeat = game.time.getCFU('blastFurnace').val * 100 + 100;
  const amount = Math.floor((maxHeat - heat) / 5);
  if (amount === 0) {
    return;
  }

  // The time tab has to be loaded once before shattering works
  let shatterCost;
  try {
    shatterCost = getShatterCost();
  } catch {
    // There is probably a better way to do this
    (document.querySelectorAll('.tabsContainer > a')[7] as HTMLLinkElement).click();
    return;
  }

  const tradeAmount = getTradeAmount();
  if (shatterCost > tradeAmount) {
    return;
  }

  game.time.shatter(amount);
  game.resPool.get('timeCrystal').value -= amount;
  game.time.heat += amount * (game.challenges.getChallenge('1000Years').researched ? 5 : 10);

  const unobtainium = game.resPool.get('unobtainium');
  let tradeTimes = -1;
  let craftTimes = -1;

  if (focus === Focus.ELUDIUM) {
    tradeTimes = Math.ceil(shatterCost / tradeAmount);
  } else {
    craftTimes = (unobtainium.value % 5000) / 1000;
  }

  if (isTradingEnabled) {
    trade(tradeTimes);
  }

  if (isCraftingEnabled) {
    craft(craftTimes);
  }
};
