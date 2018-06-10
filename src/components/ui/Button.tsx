import * as React from 'react';

const Button: React.StatelessComponent<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div className="button" {...props}>
    {children}
  </div>
);

export default Button;
