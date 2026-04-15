import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { BlockSettings } from '../../../core/setting-panel/block-setting/BlockSettings';
import { SettingTree } from '../../setting-panel/block-setting/SettingTree';
import { DMEData } from '../../types/dmeditor';
import { BlockRender } from '../renderer';
import { useEditorStore } from '../store';

export interface DMBlockEditorProps {
  initialData: DMEData.Block;
  previewMode?: boolean; // if true, the main area will be in preview mode
  mainRef: React.RefObject<HTMLDivElement | null>;
  settingsRef: React.RefObject<HTMLDivElement | null>;
  settingOnly?: boolean;
  onDataChange?: (data: DMEData.Block | null) => void;
}

export const DMBlockEditor = (props: DMBlockEditorProps) => {
  const { previewMode = false, settingOnly = false, mainRef, settingsRef } = props;
  const { storage, setStorage, setSelected } = useEditorStore();

  useEffect(() => {
    if (props.initialData) {
      setStorage([props.initialData]);
      setSelected(0, []);
    }
  }, []);

  useEffect(() => {
    if (props.onDataChange) {
      props.onDataChange(storage.length > 0 ? storage[0] : null);
    }
  }, [storage]);

  if (storage.length === 0) {
    return <div>No data</div>;
  }
  if (!mainRef.current || !settingsRef.current) {
    return <div>No ref</div>;
  }
  return (
    <div>
      <div>
        {createPortal(
          <BlockRender path={[0]} data={storage[0]} mode={previewMode ? 'view' : 'edit'} />,
          mainRef.current,
        )}
        {createPortal(
          <>
            {settingOnly && (
              <div>
                <SettingTree
                  blockData={storage[0]}
                  blockPath={[0]}
                  selectedPath={[0]}
                  options={{ mobileOnly: false }}
                  category={undefined}
                  level={0}
                  rootWidget={storage[0].type}
                />
              </div>
            )}
            {!settingOnly && (
              <div>
                <BlockSettings
                  settingOnly={settingOnly}
                  blockPath={[0]}
                  blockData={storage[0]}
                  selectedPath={[0]}
                  rootWidget={storage[0].type}
                />
              </div>
            )}
          </>,
          settingsRef.current,
        )}
      </div>
    </div>
  );
};
