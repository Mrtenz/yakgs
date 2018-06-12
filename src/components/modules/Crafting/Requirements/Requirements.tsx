import * as React from 'react';
import withContainer from './RequirementsContainer';
import NavButton from '../../../ui/NavButton';
import Button from '../../../ui/Button';

interface Props {
  label: string;
  requirements: {
    name: string;
    label: string;
    current: number;
  }[];
  onChange: (name: string, value: number) => void;
  onReset: () => void;
}

const Requirements: React.StatelessComponent<Props> = ({
  label,
  requirements,
  onChange,
  onReset
}) => (
  <>
    <p className="header">Requirements to craft {label}</p>
    <NavButton to="/crafting">Back</NavButton>

    <p>Set the minimum number of items required to craft {label}.</p>

    {requirements.map(requirement => (
      <div className="field" key={requirement.name}>
        <label>{requirement.label}</label>
        <input
          type="number"
          value={requirement.current}
          onChange={event => onChange(requirement.name, Number(event.target.value))}
        />
      </div>
    ))}

    <Button onClick={onReset}>Reset</Button>
  </>
);

export default withContainer(Requirements);
