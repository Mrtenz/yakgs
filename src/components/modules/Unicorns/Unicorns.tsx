import * as React from 'react';
import NavButton from '../../ui/NavButton';
import withContainer from './UnicornsContainer';
import { UnicornData } from '../../../utils/unicorns';

const Unicorns: React.StatelessComponent<UnicornData> = ({
  ups,
  towerEffect,
  effectiveUps,
  mostEfficient,
  resource
}) => (
  <div className="unicorns">
    <p className="header">Unicorns</p>
    <NavButton to="/">Back</NavButton>

    <p>
      In-game unicorn calculator. Based on the unicorn calculator by{' '}
      <a
        href="https://www.reddit.com/r/kittensgame/comments/6lwuao/i_added_ivory_and_alicorns_to_the_unicorn/"
        target="_blank"
      >
        Indraco
      </a>.
    </p>

    <table>
      <tbody>
        <tr>
          <td>uPS</td>
          <td>{ups}</td>
        </tr>
        <tr>
          <td>Tower effect</td>
          <td>{towerEffect}</td>
        </tr>
        <tr>
          <td>Effective uPS</td>
          <td>{effectiveUps}</td>
        </tr>
        <tr>
          <td>Most efficient</td>
          <td>{mostEfficient}</td>
        </tr>
        <tr>
          <td>{resource.label}</td>
          <td>
            {resource.current} / {resource.cost} ({resource.time})
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default withContainer(Unicorns);
