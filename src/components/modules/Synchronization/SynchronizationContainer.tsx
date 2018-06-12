import * as React from 'react';
import { ApplicationState, ConnectedReduxProps } from '../../../store';
import { SynchronizationState } from '../../../store/synchronization/types';
import { connect } from 'react-redux';
import { loadGame, saveGame, setToken, testToken } from '../../../store/synchronization/actions';

interface Props extends ConnectedReduxProps<SynchronizationState>, SynchronizationState {}

interface InjectedProps {
  token: string;
  isSynchronizing: boolean;
  isTesting: boolean;
  onLoad: () => void;
  onSave: () => void;
  onChange: (token: string) => void;
  onTest: () => void;
}

interface ExternalProps {}

const withContainer = <OriginalProps extends InjectedProps>(
  Component: React.ComponentType<OriginalProps>
) => {
  class SynchronizationContainer extends React.Component<ExternalProps & Props> {
    constructor(props: ExternalProps & Props) {
      super(props);

      this.handleLoad = this.handleLoad.bind(this);
      this.handleSave = this.handleSave.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleTest = this.handleTest.bind(this);
    }

    handleLoad() {
      const { dispatch } = this.props;
      dispatch(loadGame());
    }

    handleSave() {
      const { dispatch } = this.props;
      dispatch(saveGame());
    }

    handleChange(token: string) {
      const { dispatch } = this.props;
      dispatch(setToken(token));
    }

    handleTest() {
      const { dispatch } = this.props;
      dispatch(testToken());
    }

    render(): React.ReactNode {
      const { token, isSynchronizing, isTesting } = this.props;
      return (
        <Component
          token={token}
          isSynchronizing={isSynchronizing}
          isTesting={isTesting}
          onLoad={this.handleLoad}
          onSave={this.handleSave}
          onChange={this.handleChange}
          onTest={this.handleTest}
        />
      );
    }
  }

  const mapStateToProps = (state: ApplicationState) => state.synchronization;

  return connect(mapStateToProps)(SynchronizationContainer);
};

export default withContainer;
