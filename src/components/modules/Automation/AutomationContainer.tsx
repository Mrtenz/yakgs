import * as React from 'react';
import { AutomationState } from '../../../store/automation/types';
import { ApplicationState, ConnectedReduxProps } from '../../../store';
import { connect } from 'react-redux';
import {
  disableFeeding,
  disableHunting,
  disableObserving,
  disablePraising,
  enableFeeding,
  enableHunting,
  enableObserving,
  enablePraising
} from '../../../store/automation/actions';

interface Props extends ConnectedReduxProps<AutomationState> {}

interface InjectedProps {
  isAutoHuntEnabled: boolean;
  onToggleAutoHunt: () => void;
  isAutoPraiseEnabled: boolean;
  onToggleAutoPraise: () => void;
  isAutoObserveEnabled: boolean;
  onToggleAutoObserve: () => void;
  isAutoFeedEnabled: boolean;
  onToggleAutoFeed: () => void;
}

interface ExternalProps {}

export const withContainer = <OriginalProps extends InjectedProps>(
  Component: React.ComponentType<OriginalProps>
) => {
  class AutomationContainer extends React.Component<ExternalProps & Props & AutomationState> {
    constructor(props: ExternalProps & Props & AutomationState) {
      super(props);

      this.handleToggleAutoHunt = this.handleToggleAutoHunt.bind(this);
      this.handleToggleAutoPraise = this.handleToggleAutoPraise.bind(this);
      this.handleToggleAutoObserve = this.handleToggleAutoObserve.bind(this);
      this.handleToggleAutoFeed = this.handleToggleAutoFeed.bind(this);
    }

    handleToggleAutoHunt() {
      const { isAutoHuntEnabled, dispatch } = this.props;
      if (isAutoHuntEnabled) {
        dispatch(disableHunting());
      } else {
        dispatch(enableHunting());
      }
    }

    handleToggleAutoPraise() {
      const { isAutoPraiseEnabled, dispatch } = this.props;
      if (isAutoPraiseEnabled) {
        dispatch(disablePraising());
      } else {
        dispatch(enablePraising());
      }
    }

    handleToggleAutoObserve() {
      const { isAutoObserveEnabled, dispatch } = this.props;
      if (isAutoObserveEnabled) {
        dispatch(disableObserving());
      } else {
        dispatch(enableObserving());
      }
    }

    handleToggleAutoFeed() {
      const { isAutoFeedEnabled, dispatch } = this.props;
      if (isAutoFeedEnabled) {
        dispatch(disableFeeding());
      } else {
        dispatch(enableFeeding());
      }
    }

    render(): React.ReactNode {
      const {
        isAutoHuntEnabled,
        isAutoPraiseEnabled,
        isAutoObserveEnabled,
        isAutoFeedEnabled
      } = this.props;
      return (
        <Component
          isAutoHuntEnabled={isAutoHuntEnabled}
          onToggleAutoHunt={this.handleToggleAutoHunt}
          isAutoPraiseEnabled={isAutoPraiseEnabled}
          onToggleAutoPraise={this.handleToggleAutoPraise}
          isAutoObserveEnabled={isAutoObserveEnabled}
          onToggleAutoObserve={this.handleToggleAutoObserve}
          isAutoFeedEnabled={isAutoFeedEnabled}
          onToggleAutoFeed={this.handleToggleAutoFeed}
        />
      );
    }
  }

  const mapStateToProps = (state: ApplicationState) => state.automation;

  return connect(mapStateToProps)(AutomationContainer);
};
