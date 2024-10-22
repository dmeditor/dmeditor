import * as React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';

import type { EntityTabsBlock } from './entity';

interface BaseTabsProps {
  defaultActiveKey?: string | number;
  activeKey?: string | number;
  onSelect?: (key: string | number) => void;
  children: React.ReactNode;
}
const BaseTabs: React.FC<BaseTabsProps> = (props) => {
  const { activeKey, defaultActiveKey, children, onSelect } = props;
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeKey, defaultActiveKey, onSelect });
        }
        return child;
      })}
    </>
  );
};

type TabPaneProps = Pick<
  TransitionProps,
  'onEnter' | 'onEntered' | 'onEntering' | 'onExit' | 'onExited' | 'onExiting'
> &
  EntityTabsBlock['meta'] & {
    activeKey: string | number;
    children: React.ReactNode;
  };
const TabPane: React.FC<TabPaneProps> = (props) => {
  const {
    activeKey,
    tabKey,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    children,
  } = props;
  const transitionEventsProps = {
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
  };

  const isActive = activeKey === tabKey;
  return (
    <Transition in={isActive} timeout={300} appear={true} {...transitionEventsProps}>
      <div style={{ display: isActive ? 'block' : 'none' }} aria-hidden={!isActive} role="tabpanel">
        {children}
      </div>
    </Transition>
  );
};
export { BaseTabs, TabPane };
