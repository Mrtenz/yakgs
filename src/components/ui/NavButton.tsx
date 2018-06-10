import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
}

const NavButton: React.StatelessComponent<Props> = ({ to, children }) => (
  <Link to={to} className="button">
    {children}
  </Link>
);

export default NavButton;
