import * as React from 'react';
import NavButton from '../../ui/NavButton';
import Button from '../../ui/Button';
import withContainer from './SynchronizationContainer';

interface Props {
  token: string;
  isSynchronizing: boolean;
  isTesting: boolean;
  onLoad: () => void;
  onSave: () => void;
  onChange: (token: string) => void;
  onTest: () => void;
}

const Synchronization: React.StatelessComponent<Props> = ({
  token,
  isSynchronizing,
  isTesting,
  onLoad,
  onSave,
  onChange,
  onTest
}) => (
  <div className="synchronization">
    <p className="header">Synchronization</p>
    <NavButton to="/">Back</NavButton>

    <p>Synchronize your game using Github Gists.</p>
    <p className="small">Be careful! Loading here will overwrite your current save.</p>

    {isSynchronizing && <p>Synchronizing...</p>}

    <Button onClick={onLoad}>Load</Button>
    <Button onClick={onSave}>Save</Button>

    <div className="field">
      <label>
        <a href="https://github.com/settings/tokens" target="_blank">
          Github Token
        </a>
      </label>
      <p className="small">The Github Token needs Gist permissions!</p>
      <input type="text" value={token} onChange={event => onChange(event.target.value)} />
    </div>

    {isTesting && <p>Testing...</p>}

    <Button onClick={onTest}>Test Github Token</Button>
  </div>
);

export default withContainer(Synchronization);
