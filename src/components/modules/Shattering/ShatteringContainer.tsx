import * as React from 'react';
import { Focus, ShatteringState } from '../../../store/shattering/types';
import { Target } from '../../ui/SwitchButton';
import { ApplicationState, ConnectedReduxProps } from '../../../store';
import { connect } from 'react-redux';
import {
  disableShattering,
  enableShattering,
  setFocus,
  toggleCrafting,
  toggleTrading
} from '../../../store/shattering/actions';

interface Props extends ConnectedReduxProps<ShatteringState> {}

interface InjectedProps {
  isEnabled: boolean;
  onToggleShattering: () => void;
  isTradingEnabled: boolean;
  onToggleTrading: () => void;
  isCraftingEnabled: boolean;
  onToggleCrafting: () => void;
  target: Focus;
  targets: Target<Focus>[];
  onSwitchTarget: (target: Target<Focus>) => void;
}

interface ExternalProps {}

export const withContainer = <OriginalProps extends InjectedProps>(
  Component: React.ComponentType<OriginalProps>
) => {
  class ShatteringContainer extends React.Component<ExternalProps & Props & ShatteringState> {
    targets = [
      {
        name: 'Time Crystals',
        value: Focus.TIME_CRYSTALS
      },
      {
        name: 'Eludium',
        value: Focus.ELUDIUM
      },
      {
        name: 'Balance',
        value: Focus.BALANCE
      }
    ];

    constructor(props: ExternalProps & Props & ShatteringState) {
      super(props);

      this.handleToggleShattering = this.handleToggleShattering.bind(this);
      this.handleToggleTrading = this.handleToggleTrading.bind(this);
      this.handleToggleCrafting = this.handleToggleCrafting.bind(this);
      this.handleSwitchTarget = this.handleSwitchTarget.bind(this);
    }

    handleToggleShattering() {
      const { isEnabled, dispatch } = this.props;
      if (isEnabled) {
        dispatch(disableShattering());
      } else {
        dispatch(enableShattering());
      }
    }

    handleToggleTrading() {
      this.props.dispatch(toggleTrading());
    }

    handleToggleCrafting() {
      this.props.dispatch(toggleCrafting());
    }

    handleSwitchTarget(target: Target<Focus>) {
      this.props.dispatch(setFocus(target.value));
    }

    render(): React.ReactNode {
      const { isEnabled, isTradingEnabled, isCraftingEnabled, focus } = this.props;

      return (
        <Component
          isEnabled={isEnabled}
          onToggleShattering={this.handleToggleShattering}
          isTradingEnabled={isTradingEnabled}
          onToggleTrading={this.handleToggleTrading}
          isCraftingEnabled={isCraftingEnabled}
          onToggleCrafting={this.handleToggleCrafting}
          target={focus}
          targets={this.targets}
          onSwitchTarget={this.handleSwitchTarget}
        />
      );
    }
  }

  const mapStateToProps = (state: ApplicationState) => state.shattering;

  return connect(mapStateToProps)(ShatteringContainer);
};
