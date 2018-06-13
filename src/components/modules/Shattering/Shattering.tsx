import * as React from 'react';
import { getTradeAmount, getUnobtainiumPerShatter } from '../../../utils/shattering';
import { default as SwitchButton, Target } from '../../ui/SwitchButton';
import { Focus } from '../../../store/shattering/types';
import withContainer from './ShatteringContainer';
import NavButton from '../../ui/NavButton';
import ToggleButton from '../../ui/ToggleButton';

declare const game: any;

interface Props {
  isEnabled: boolean;
  onToggleShattering: () => void;
  isTradingEnabled: boolean;
  onToggleTrading: () => void;
  isCraftingEnabled: boolean;
  onToggleCrafting: () => void;
  target: Focus;
  targets: Target<Focus>[];
  onSwitchTarget: (target: Target<Focus>) => void;
  cycle: string;
  onChangeCycle: (cycle: string) => void;
}

const Shattering: React.StatelessComponent<Props> = ({
  isEnabled,
  onToggleShattering,
  target,
  targets,
  onSwitchTarget,
  isTradingEnabled,
  onToggleTrading,
  isCraftingEnabled,
  onToggleCrafting,
  cycle,
  onChangeCycle
}) => (
  <div className="shattering">
    <p className="header">Shattering</p>
    <NavButton to="/">Back</NavButton>

    <p>Automatically shatter Time Crystals.</p>

    <ToggleButton
      enabled={isEnabled}
      enabledText="Disable Shattering"
      disabledText="Enable Shattering"
      onClick={onToggleShattering}
    />

    <SwitchButton
      prefix="Focus on:"
      target={
        targets.find(t => t.value === target) || {
          name: 'Time Crystals',
          value: Focus.TIME_CRYSTALS
        }
      }
      targets={targets}
      onSwitch={onSwitchTarget}
    />

    <ToggleButton
      enabled={isTradingEnabled}
      enabledText="Disable Trading"
      disabledText="Enable Trading"
      onClick={onToggleTrading}
    />

    <ToggleButton
      enabled={isCraftingEnabled}
      enabledText="Disable Crafting"
      disabledText="Enable Crafting"
      onClick={onToggleCrafting}
    />

    <div className="field">
      <label>Target Cycle</label>
      <p className="small">
        By selecting a cycle here, it will shatter up to that cycle and not shatter during the
        cycle.
      </p>
      <select value={cycle} onChange={event => onChangeCycle(event.target.value)}>
        <option value="none">None</option>
        {game.calendar.cycles.map((cycle: any) => (
          <option key={cycle.name} value={cycle.name}>
            {cycle.title}
          </option>
        ))}
      </select>
    </div>

    <table>
      <tbody>
        <tr>
          <td>Dark future</td>
          <td>{game.calendar.darkFutureYears(true) > 0 ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td>Years in/to dark future</td>
          <td>{Math.abs(game.calendar.darkFutureYears(true))}</td>
        </tr>
        <tr>
          <td>Trade amount</td>
          <td>{getTradeAmount().toFixed(2)}</td>
        </tr>
        <tr>
          <td>Per shatter</td>
          <td>{getUnobtainiumPerShatter().toFixed(2)}</td>
        </tr>
        <tr>
          <td>Efficiency</td>
          <td>{((getTradeAmount() / 5000) * getUnobtainiumPerShatter() * 100).toFixed(2)}%</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default withContainer(Shattering);
