import * as React from 'react';

interface NavProps extends React.HTMLAttributes<HTMLElement> {}
const Nav = (props: NavProps) => {
  return (
    <div role="tablist" className="flex border-b">
      {props.children}
    </div>
  );
};

export default Nav;
