import * as React from 'react';
import NavButton from '../../ui/NavButton';
import withContainer from './NotificationsContainer';
import ToggleButton from '../../ui/ToggleButton';

interface Props {
  isEnabled: boolean;
  onToggle: () => void;
}

const Notifications: React.StatelessComponent<Props> = ({ isEnabled, onToggle }) => (
  <div className="notifications">
    <p className="header">Notifications</p>
    <NavButton to="/">Back</NavButton>

    <ToggleButton
      enabled={isEnabled}
      enabledText="Disable Notifications"
      disabledText="Enable Notifications"
      onClick={onToggle}
    />

    <p>Triggers</p>
    <NavButton to="/notifications/resources">Resources</NavButton>
  </div>
);

export default withContainer(Notifications);
