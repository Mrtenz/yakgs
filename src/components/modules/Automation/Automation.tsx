import * as React from 'react';
import { withContainer } from './AutomationContainer';
import NavButton from '../../ui/NavButton';
import ToggleButton from '../../ui/ToggleButton';

interface Props {
  isAutoHuntEnabled: boolean;
  onToggleAutoHunt: () => void;
  isAutoPraiseEnabled: boolean;
  onToggleAutoPraise: () => void;
  isAutoObserveEnabled: boolean;
  onToggleAutoObserve: () => void;
  isAutoFeedEnabled: boolean;
  onToggleAutoFeed: () => void;
}

const Automation: React.StatelessComponent<Props> = ({
  isAutoHuntEnabled,
  onToggleAutoHunt,
  isAutoPraiseEnabled,
  onToggleAutoPraise,
  isAutoObserveEnabled,
  onToggleAutoObserve,
  isAutoFeedEnabled,
  onToggleAutoFeed
}) => (
  <div className="automation">
    <p className="header">Automation</p>
    <NavButton to="/">Back</NavButton>

    <p>Miscellaneous automation stuff.</p>

    <ToggleButton
      enabled={isAutoHuntEnabled}
      enabledText="Disable Auto Hunt"
      disabledText="Enable Auto Hunt"
      onClick={onToggleAutoHunt}
    />

    <ToggleButton
      enabled={isAutoPraiseEnabled}
      enabledText="Disable Auto Praise"
      disabledText="Enable Auto Praise"
      onClick={onToggleAutoPraise}
    />

    <ToggleButton
      enabled={isAutoObserveEnabled}
      enabledText="Disable Auto Observe"
      disabledText="Enable Auto Observe"
      onClick={onToggleAutoObserve}
    />

    <ToggleButton
      enabled={isAutoFeedEnabled}
      enabledText="Disable Auto Feed"
      disabledText="Enable Auto Feed"
      onClick={onToggleAutoFeed}
    />
  </div>
);

export default withContainer(Automation);
