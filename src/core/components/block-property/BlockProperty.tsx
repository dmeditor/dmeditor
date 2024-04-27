import React from 'react';
import { createPortal } from 'react-dom';

declare global {
  interface Window {
    dmeditorPropertyTab: (params: any) => void;
  }
}

//todo: use one instance so it can put multi to multi tabs.
export const BlockProperty = (props: {
  blocktype: string;
  inBlock?: boolean;
  children?: React.ReactNode;
}) => {
  if (typeof window === 'undefined') {
    return <></>;
  }

  const propertyRoot = document.getElementById('dmeditor-property');

  const tabClick = (e: any) => {
    window.dmeditorPropertyTab(e);
    // ?window.dmeditorTab(e):
  };

  return propertyRoot ? (
    <>
      {propertyRoot.children[0] ? (
        createPortal(
          <div className="tab-header" onClick={tabClick}>
            <button className="btn">
              {/* {i18n.t(getDef(props.blocktype).name, { ns: 'blocktype' })} */}
            </button>
          </div>,
          propertyRoot.children[0] as HTMLElement,
        )
      ) : (
        <></>
      )}
      {propertyRoot.children[1] ? (
        createPortal(
          <div className="tab-body">{props.children}</div>,
          propertyRoot.children[1] as HTMLElement,
        )
      ) : (
        <></>
      )}
    </>
  ) : (
    <></>
  );
};
