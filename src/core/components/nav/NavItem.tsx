import * as React from 'react';
import type { DME } from 'dmeditor/types';

import { Button } from '../widgets/button';
import { EntityTabsBlock } from '../widgets/tabs/entity';
import { useTabsStore } from '../widgets/tabs/store';

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
  let cls = props.className;
  if (isActive) {
    cls += ' border-gray-200';
  } else {
    cls += ' border-transparent';
  }
  let styles: React.CSSProperties | undefined = undefined;
  if (isActive) {
    // styles.borderBottomColor = 'white';
    styles = {
      borderBottomColor: 'white',
    };
  }
  const handleClick = () => {
    if (isActive) return;
    setActiveKey(props.tabKey);
  };
  const navProps = {
    ...props,
    styleClasses: cls,
    blockNode,
    onClick: handleClick,
  };
  return (
    <Button
      style={styles}
      {...navProps}
      buttonType="button"
      rootClasses={rootClasses}
      onClick={handleClick}
    />
  );
};

export default NavItem;
