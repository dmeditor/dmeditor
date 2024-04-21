import * as React from 'react';
import ReactDOM from 'react-dom';
import { Transition as RTGTransition } from 'react-transition-group';
import type { TransitionGroup, TransitionStatus } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';

import useMergedRefs from './useMergedRefs';

const { useRef, useCallback, cloneElement } = React;

type ITransitionProps = TransitionProps & {};

function safeFindDOMNode(componentOrElement: React.Component | Element | null | undefined) {
  if (componentOrElement && 'setState' in componentOrElement) {
    return ReactDOM.findDOMNode(componentOrElement);
  }
  return (componentOrElement ?? null) as Element | Text | null;
}
function map<P = any>(children: any, func: (el: React.ReactElement<P>, index: number) => any) {
  let index = 0;

  return React.Children.map(children, (child) =>
    React.isValidElement<P>(child) ? func(child, index++) : child,
  );
}
const Transition = (props: ITransitionProps) => {
  const nodeRef = useRef<HTMLElement>(null);
  const { childRef, children } = props;
  const mergedRef = useMergedRefs(nodeRef, childRef);

  const attachRef = (r: React.Component | Element | null | undefined) => {
    mergedRef(safeFindDOMNode(r));
  };
  const normalize = (callback?: (node: HTMLElement, param: any) => void) => (param: any) => {
    if (callback && nodeRef.current) {
      callback(nodeRef.current, param);
    }
  };
  const transitionProps = {
    ...props,
    addEndListener: useCallback(normalize(props.addEndListener), [props.addEndListener]),
  };

  return (
    <RTGTransition nodeRef={nodeRef} {...transitionProps}>
      {typeof children === 'function'
        ? (
            status: TransitionStatus,
            innerProps: any,
            // innerProps: Record<string, unknown>,
          ) => {
            return children(status, {
              ...innerProps,
              ref: attachRef,
            });
          }
        : null}
    </RTGTransition>
  );
};

export default Transition;
