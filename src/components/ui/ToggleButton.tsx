import * as React from 'react';

interface Props {
  enabled: boolean;
  enabledText: string;
  disabledText: string;
  onClick: () => void;
}

const ToggleButton: React.StatelessComponent<Props> = ({
  enabled,
  enabledText,
  disabledText,
  onClick
}) => (
  <div className="button" onClick={onClick}>
    {enabled ? enabledText : disabledText}
  </div>
);

export default ToggleButton;
