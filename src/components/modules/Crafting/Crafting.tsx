import * as React from 'react';
import { Item } from '../../../store/crafting/types';
import { withContainer } from './CraftingContainer';
import NavButton from '../../ui/NavButton';
import Button from '../../ui/Button';
import { Link } from 'react-router-dom';

interface Props {
  items: Item[];
  selectedItems: string[];
  isEnabled: boolean;
  onToggleCrafting: () => void;
  onToggleItem: (item: string) => void;
}

const Crafting: React.StatelessComponent<Props> = ({
  items,
  selectedItems,
  isEnabled,
  onToggleCrafting,
  onToggleItem
}) => (
  <div className="auto-crafting">
    <p className="header">Crafting</p>
    <NavButton to="/">Back</NavButton>

    <p>Automatically craft items.</p>

    <Button onClick={onToggleCrafting}>{isEnabled ? 'Disable Crafting' : 'Enable Crafting'}</Button>

    <ul className="form">
      {items.map(item => (
        <li key={item.name}>
          <div className="left">
            <input
              id={`item-${item.name}`}
              type="checkbox"
              defaultChecked={selectedItems.some(selection => selection === item.name)}
              onClick={() => onToggleItem(item.name)}
            />
            <label htmlFor={`item-${item.name}`}>{item.label}</label>
          </div>
          <div className="right">
            <Link to={`/crafting/${item.name}`} className="small">
              Configure
            </Link>
          </div>
          <div className="clear" />
        </li>
      ))}
    </ul>
  </div>
);

export default withContainer(Crafting);
