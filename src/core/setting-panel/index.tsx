import * as React from 'react';
import { useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { Settings } from '@mui/icons-material';
import { Button } from '@mui/material';

import { useEditorStore } from '../main/store';
import { AddBlock } from './AddBlock';
import { CommonSettings } from './CommonSetting';
import { ListOverview } from './ListOverview';
import { PageSetting } from './PageSetting';
import { Path, PathItem } from './Path';
import WidgetSetting from './property-setting/property-item';
import { PageTitle, RightElement, SettingHeader, Space } from './style';
import emitter from 'Core/utils/event';

const { useEffect } = React;

type SettingPanelMode = 'setting' | 'list' | 'page-setting' | 'add-block';

// const SettingPanel = ({ selectedWidget }: { selectedWidget: string }) => {
const SettingPanel = (props) => {
  const {
    selected: { blockIndex: selectedBlockIndex, currentList },
    addBlockData:{index: addBlockIndex, position: addBlockPosition},
    getSelectedBlock,
    isSelected,
  } = useEditorStore((state) => state);

  const [mode, setMode] = useState<SettingPanelMode>('setting');
  const [pathArray, setPathArray] = useState([] as Array<PathItem>);

  useEffect(() => {

    if(addBlockIndex !== -Infinity ){
      setMode('add-block');
      console.log('hello');
    }else{
      if (isSelected()) {
        setMode('setting');
      }else{
        setMode('list');
      }
    }

    //for test for now
    setPathArray([
      { text: 'Page', id: '111', level: 0 },
      { text: 'Heading', id: '112', level: 1, disableClick: true },
    ]);
  }, [selectedBlockIndex, addBlockIndex]);

  const hasSelect = isSelected();

  const selectedBlock = useMemo(() => getSelectedBlock(selectedBlockIndex), [selectedBlockIndex]);

  const selectPathItem = (index: number) => {
    const path = pathArray[index];
    setMode('list');
  };

  return (
    <div
      className={css`
        padding: 5px;
      `}
    >
      {mode === 'add-block' && <AddBlock />}
      {mode !== 'add-block' && (
        <>
          <RightElement>
            <Button title="Page settings" onClick={() => setMode('page-setting')}>
              <Settings />
            </Button>
          </RightElement>
          <PageTitle>New page</PageTitle>
          <Space />
          <Path pathArray={pathArray} onSelect={selectPathItem} />
          <Space />
          {['list', 'setting'].includes(mode) && (
            <>
              {mode === 'list' && (
                <ListOverview data={currentList} selectedIndex={selectedBlockIndex} />
              )}
              {hasSelect && mode === 'setting' && (
                <>
                  <SettingHeader>{selectedBlock?.type}</SettingHeader>
                  <CommonSettings {...props} selectedWidgetIndex={selectedBlockIndex} />
                </>
              )}
              {/* <WidgetSetting selected={selectedWidget} /> */}
            </>
          )}
          {mode === 'page-setting' && <PageSetting />}
        </>
      )}
    </div>
  );
};

export default SettingPanel;
