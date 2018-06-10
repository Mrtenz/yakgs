import * as React from 'react';
import Button from './Button';

interface Props {
  prefix: string;
  target: Target<any>;
  targets: Target<any>[];
  onSwitch: (target: Target<any>) => void;
}

export interface Target<S> {
  name: string;
  value: S;
}

const switchTarget = (
  currentTarget: Target<any>,
  targets: Target<any>[],
  onSwitch: (target: Target<any>) => void
) => {
  const index = targets.findIndex(
    (target: Target<any>): boolean => {
      return target.value === currentTarget.value;
    }
  );

  const nextIndex = index + 1 >= targets.length ? 0 : index + 1;
  onSwitch(targets[nextIndex]);
};

const SwitchButton: React.StatelessComponent<Props> = ({
  prefix,
  target,
  targets,
  onSwitch
}) => (
  <div onClick={() => switchTarget(target, targets, onSwitch)}>
    <Button>
      {prefix} {target.name}
    </Button>
  </div>
);

export default SwitchButton;
