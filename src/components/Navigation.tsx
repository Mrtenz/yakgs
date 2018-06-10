import * as React from 'react';
import NavButton from './ui/NavButton';

const Navigation: React.StatelessComponent = () => (
  <div className="navigation">
    <NavButton to="/crafting">Crafting</NavButton>
    <NavButton to="/shattering">Shattering</NavButton>
    <NavButton to="/automation">Automation</NavButton>
  </div>
);

export default Navigation;
