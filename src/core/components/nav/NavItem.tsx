import * as React from 'react';
import { ClassNames } from '@emotion/react';

import { Button } from '../../../widgets/button';
import { EntityTabsBlock } from '../../../widgets/tabs/entity';
import { useTabsStore } from '../../../widgets/tabs/store';
import type { DME } from '../../types';

interface NavItemProps
  extends React.HTMLAttributes<HTMLElement>,
    DME.WidgetRenderProps<EntityTabsBlock> {
  tabKey: string | number;
}
const NavItem = (props: NavItemProps) => {
  const blockNode = {
    data: {
      value: props.children,
      link: '#',
    },
  };
  const rootClasses = props.rootClasses;
  const { activeKey, setActiveKey } = useTabsStore();
  const isActive = activeKey === props.tabKey;
  let cls = props.className || '';
  if (isActive) {
    cls += ' dme-w-active';
  }
  const handleClick = () => {
    if (isActive) return;
    setActiveKey(props.tabKey);
  };
  const navProps = {
    ...props,
    className: cls,
    onClick: handleClick,
  };

  return <button {...navProps} />;
};

export default NavItem;
