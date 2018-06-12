import * as React from 'react';
import { CraftingState, Item } from '../../../store/crafting/types';
import { ApplicationState, ConnectedReduxProps } from '../../../store';
import { connect } from 'react-redux';
import {
  addItem,
  disableCrafting,
  enableCrafting,
  removeItem
} from '../../../store/crafting/actions';

interface Props extends ConnectedReduxProps<CraftingState>, CraftingState {}

interface InjectedProps {
  items: Item[];
  selectedItems: string[];
  isEnabled: boolean;
  onToggleCrafting: () => void;
  onToggleItem: (item: string) => void;
}

interface ExternalProps {}

const withContainer = <OriginalProps extends InjectedProps>(
  Component: React.ComponentType<OriginalProps>
) => {
  class CraftingContainer extends React.Component<ExternalProps & Props> {
    constructor(props: ExternalProps & Props) {
      super(props);

      this.handleToggleItem = this.handleToggleItem.bind(this);
      this.handleToggleCrafting = this.handleToggleCrafting.bind(this);
    }

    static getItems(): Item[] {
      return game.workshop.crafts.map((workshopCraft: { name: string; label: string }) => ({
        name: workshopCraft.name,
        label: workshopCraft.label
      }));
    }

    handleToggleItem(item: string) {
      const { selectedItems, dispatch } = this.props;
      if (selectedItems.some(i => i === item)) {
        dispatch(removeItem(item));
      } else {
        dispatch(addItem(item));
      }
    }

    handleToggleCrafting() {
      const { isEnabled, dispatch } = this.props;
      if (isEnabled) {
        dispatch(disableCrafting());
      } else {
        dispatch(enableCrafting());
      }
    }

    render(): React.ReactNode {
      const { selectedItems, isEnabled } = this.props;

      return (
        <Component
          items={CraftingContainer.getItems()}
          selectedItems={selectedItems}
          isEnabled={isEnabled}
          onToggleItem={this.handleToggleItem}
          onToggleCrafting={this.handleToggleCrafting}
        />
      );
    }
  }

  const mapStateToProps = (state: ApplicationState) => state.crafting;

  return connect(mapStateToProps)(CraftingContainer);
};

export default withContainer;
