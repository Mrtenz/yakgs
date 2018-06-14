import * as React from 'react';
import withContainer from './ResourceTriggersContainer';
import NavButton from '../../../ui/NavButton';

interface Props {
  items: { name: string; label: string; isEnabled: boolean }[];
  onToggleItem: (name: string) => void;
}

const ResourceTriggers: React.StatelessComponent<Props> = ({ items, onToggleItem }) => (
  <div className="resource-triggers">
    <p className="header">Resources</p>
    <NavButton to="/notifications">Back</NavButton>

    <p>
      When a resource is selected, you will get a notification when the resource is at least 95%
      full.
    </p>

    <ul className="form">
      {items.map(item => (
        <li key={item.name}>
          <input
            id={`item-${item.name}`}
            type="checkbox"
            defaultChecked={item.isEnabled}
            onClick={() => onToggleItem(item.name)}
          />
          <label htmlFor={`item-${item.name}`}>{item.label}</label>
        </li>
      ))}
    </ul>
  </div>
);

export default withContainer(ResourceTriggers);
