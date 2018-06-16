import * as React from 'react';
import { Focus, ShatteringState } from '../../../store/shattering/types';
import { Target } from '../../ui/SwitchButton';
import { ApplicationState, ConnectedReduxProps } from '../../../store';
import { connect } from 'react-redux';
import {
  disableShattering,
  enableShattering,
  setDelay,
  setFocus,
  setTargetCycle,
  toggleCrafting,
  toggleTrading
} from '../../../store/shattering/actions';

interface Props extends ConnectedReduxProps<ShatteringState>, ShatteringState {}

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
  cycle: string;
  onChangeCycle: (cycle: string) => void;
  delay: number;
  onChangeDelay: (delay: number) => void;
}

interface ExternalProps {}

const withContainer = <OriginalProps extends InjectedProps>(
  Component: React.ComponentType<OriginalProps>
) => {
  class ShatteringContainer extends React.Component<ExternalProps & Props> {
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

    constructor(props: ExternalProps & Props) {
      super(props);

      this.handleToggleShattering = this.handleToggleShattering.bind(this);
      this.handleToggleTrading = this.handleToggleTrading.bind(this);
      this.handleToggleCrafting = this.handleToggleCrafting.bind(this);
      this.handleSwitchTarget = this.handleSwitchTarget.bind(this);
      this.handleChangeCycle = this.handleChangeCycle.bind(this);
      this.handleChangeDelay = this.handleChangeDelay.bind(this);
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

    handleChangeCycle(cycle: string) {
      this.props.dispatch(setTargetCycle(cycle));
    }

    handleChangeDelay(delay: number) {
      this.props.dispatch(setDelay(delay));
    }

    render(): React.ReactNode {
      const {
        isEnabled,
        isTradingEnabled,
        isCraftingEnabled,
        focus,
        targetCycle,
        delay
      } = this.props;

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
          cycle={targetCycle}
          onChangeCycle={this.handleChangeCycle}
          delay={delay}
          onChangeDelay={this.handleChangeDelay}
        />
      );
    }
  }

  const mapStateToProps = (state: ApplicationState) => state.shattering;

  return connect(mapStateToProps)(ShatteringContainer);
};

export default withContainer;
