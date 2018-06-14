import * as React from 'react';
import { ApplicationState, ConnectedReduxProps } from '../../../../store';
import { NotificationsState } from '../../../../store/notifications/types';
import { connect } from 'react-redux';
import { addResourceTrigger, removeResourceTrigger } from '../../../../store/notifications/actions';

interface Props extends ConnectedReduxProps<NotificationsState>, NotificationsState {}

interface InjectedProps {
  items: { name: string; label: string; isEnabled: boolean }[];
  onToggleItem: (name: string) => void;
}

interface ExternalProps {}

const withContainer = <OriginalProps extends InjectedProps>(
  Component: React.ComponentType<OriginalProps>
) => {
  class ResourceTriggersContainer extends React.Component<ExternalProps & Props> {
    constructor(props: ExternalProps & Props) {
      super(props);

      this.handleToggleItem = this.handleToggleItem.bind(this);
    }

    handleToggleItem(item: string) {
      const { dispatch, triggers } = this.props;
      if (triggers.resources.indexOf(item) !== -1) {
        dispatch(removeResourceTrigger(item));
      } else {
        dispatch(addResourceTrigger(item));
      }
    }

    render(): React.ReactNode {
      const { triggers } = this.props;

      const items = game.resPool.resources
        .filter((resource: any) => resource.maxValue > 0)
        .map((resource: any) => ({
          name: resource.name,
          label: resource.title,
          isEnabled: triggers.resources.indexOf(resource.name) !== -1
        }));

      return <Component items={items} onToggleItem={this.handleToggleItem} />;
    }
  }

  const mapStateToProps = (state: ApplicationState) => state.notifications;

  return connect(mapStateToProps)(ResourceTriggersContainer);
};

export default withContainer;
