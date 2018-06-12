import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ApplicationState, ConnectedReduxProps } from '../../../../store';
import { CraftingState } from '../../../../store/crafting/types';
import { resetRequirements, setRequirements } from '../../../../store/crafting/actions';
import { connect } from 'react-redux';

interface Props
  extends RouteComponentProps<{ item: string }>,
    ConnectedReduxProps<CraftingState>,
    CraftingState {}

interface InjectedProps {
  label: string;
  requirements: {
    name: string;
    label: string;
    current: number;
  }[];
  onChange: (name: string, value: number) => void;
  onReset: () => void;
}

interface ExternalProps {}

const withContainer = <OriginalProps extends InjectedProps>(
  Component: React.ComponentType<OriginalProps>
) => {
  class RequirementsContainer extends React.Component<ExternalProps & Props> {
    constructor(props: ExternalProps & Props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleReset = this.handleReset.bind(this);
    }

    static emptyRequirements(item: any): { [name: string]: number } {
      return item.prices.reduce((target: { [name: string]: number }, current: any) => {
        target[current.name] = 0;
        return target;
      }, {});
    }

    handleChange(name: string, value: number) {
      const { match, requirements, dispatch } = this.props;
      const itemName = match.params.item;
      const item = game.workshop.getCraft(itemName);

      const req = requirements[itemName] || RequirementsContainer.emptyRequirements(item);
      req[name] = value;

      dispatch(setRequirements(itemName, req));
    }

    handleReset() {
      const { match, dispatch } = this.props;
      const itemName = match.params.item;

      dispatch(resetRequirements(itemName));
    }

    render(): React.ReactNode {
      const { match, requirements } = this.props;
      const itemName = match.params.item;
      const item = game.workshop.getCraft(itemName);

      const req = requirements[itemName] || RequirementsContainer.emptyRequirements(item);
      const parsed = Object.keys(req).map(key => ({
        name: key,
        label: game.resPool.get(key).title,
        current: req[key]
      }));

      return (
        <Component
          label={item.label}
          requirements={parsed}
          onChange={this.handleChange}
          onReset={this.handleReset}
        />
      );
    }
  }

  const mapStateToProps = (state: ApplicationState) => state.crafting;

  return connect(mapStateToProps)(RequirementsContainer);
};

export default withContainer;
