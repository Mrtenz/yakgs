import * as React from 'react';
import { calculate, UnicornData } from '../../../utils/unicorns';

interface Props {}

interface InjectedProps extends UnicornData {}

interface ExternalProps {}

const withContainer = <OriginalProps extends InjectedProps>(
  Component: React.ComponentType<OriginalProps>
) => {
  class UnicornsContainer extends React.Component<ExternalProps & Props, UnicornData> {
    constructor(props: ExternalProps & Props) {
      super(props);
    }

    componentWillMount() {
      this.setState(calculate());
    }

    render(): React.ReactNode {
      return <Component {...this.state} />;
    }
  }

  return UnicornsContainer;
};

export default withContainer;
