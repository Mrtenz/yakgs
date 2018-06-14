import * as React from 'react';
import { ApplicationState, ConnectedReduxProps } from '../../../store';
import { connect } from 'react-redux';
import { NotificationsState } from '../../../store/notifications/types';
import { disableNotifications, enableNotifications } from '../../../store/notifications/actions';

interface Props extends ConnectedReduxProps<NotificationsState>, NotificationsState {}

interface InjectedProps {
  isEnabled: boolean;
  onToggle: () => void;
}

interface ExternalProps {}

const withContainer = <OriginalProps extends InjectedProps>(
  Component: React.ComponentType<OriginalProps>
) => {
  class NotificationsContainer extends React.Component<ExternalProps & Props> {
    constructor(props: ExternalProps & Props) {
      super(props);

      this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
      const { isEnabled, dispatch } = this.props;
      if (isEnabled) {
        dispatch(disableNotifications());
      } else {
        dispatch(enableNotifications());
      }
    }

    render(): React.ReactNode {
      const { isEnabled } = this.props;
      return <Component isEnabled={isEnabled} onToggle={this.handleToggle} />;
    }
  }

  const mapStateToProps = (state: ApplicationState) => state.notifications;

  return connect(mapStateToProps)(NotificationsContainer);
};

export default withContainer;
