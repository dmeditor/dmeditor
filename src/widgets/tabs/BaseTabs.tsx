import * as React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';

import { useTabsStore } from './store';

interface BaseTabsProps {
  defaultActiveKey?: string | number;
  activeKey?: string | number;
  onSelect?: (key: string | number) => void;
  children: React.ReactNode;
}
const BaseTabs = (props: BaseTabsProps) => {
  const { activeKey, defaultActiveKey, children, onSelect } = props;
  return (
    // <StyledBaseTabs isActive={!!activeKey}>
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
  'onEnter' | 'onEntered' | 'onEntering' | 'onExit' | 'onExited' | 'onExiting' | 'children'
> & {
  tabKey: string | number;
};
const TabPane = (props: TabPaneProps) => {
  const { activeKey } = useTabsStore();
  const { tabKey, onEnter, onEntered, onEntering, onExit, onExited, onExiting } = props;
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
      <div hidden={!isActive} aria-hidden={!isActive} role="tabpanel">
        {props.children}
      </div>
    </Transition>
  );
};
// export default BaseTabs;
export { BaseTabs, TabPane };
