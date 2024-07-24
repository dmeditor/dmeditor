import * as React from 'react';

interface NavItemProps extends Pick<React.HTMLAttributes<HTMLElement>, 'className' | 'onClick'> {
  activeKey: string | number;
  tabKey: string | number;
  onTabClick?: (key: string | number) => void;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const { activeKey, tabKey, className, onTabClick } = props;
  const isActive = activeKey === tabKey;
  let cls = className || '';
  if (isActive) {
    cls += ' dme-w-active';
  }

  const handleClick = () => {
    if (isActive) return;
    onTabClick?.(tabKey);
  };

  const navProps = {
    ...props,
    className: cls,
    onClick: handleClick,
  };

  return <button {...navProps} />;
};

export default NavItem;
