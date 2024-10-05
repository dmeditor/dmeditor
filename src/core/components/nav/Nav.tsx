import * as React from 'react';

interface NavProps extends React.HTMLAttributes<HTMLElement> {}
const Nav = (props: NavProps) => {
  return (
    <div role="tablist" className={'flex ' + (props.className || '')}>
      {props.children}
    </div>
  );
};

export default Nav;
