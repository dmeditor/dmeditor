import * as React from 'react';
import { useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { Settings } from '@mui/icons-material';
import { Button } from '@mui/material';

import { getWidget } from '../components/widgets';
import { useEditorStore } from '../main/store';
import { AddBlock } from './AddBlock';
import { BlockSettings } from './BlockSettings';
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
    addBlockData: { index: addBlockIndex, position: addBlockPosition },
    getSelectedBlock,
    isSelected,
  } = useEditorStore((state) => state);

  const [mode, setMode] = useState<SettingPanelMode>('setting');
  const [pathArray, setPathArray] = useState([] as Array<PathItem>);

  const selectedBlock = useMemo(() => getSelectedBlock(selectedBlockIndex), [selectedBlockIndex]);

  useEffect(() => {
    if (addBlockIndex !== -Infinity) {
      setMode('add-block');
      console.log('hello');
    } else {
      if (isSelected()) {
        setMode('setting');
      } else {
        setMode('list');
      }
    }

    const pathArray:Array<PathItem> = [{ text: 'Page', id: 'page', }];
    if (isSelected()) {
      //todo: get path data
      pathArray.push({ text: 'container', id: '112', disableClick: true });
      pathArray.push({
        text: getWidget(selectedBlock?.type || '')?.name || '',
        id: selectedBlock?.id || '',
      });
    }
    setPathArray(pathArray);
  }, [selectedBlockIndex, addBlockIndex]);

  const hasSelect = isSelected();

  const selectPathItem = (level: number) => {
    if(level===0){
      const path = pathArray[level];
      setMode('list');
    }else{
      setMode('setting');
    }
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
          <Path selectedId={selectedBlock?.id||'page'} pathArray={pathArray} onSelect={selectPathItem} />
          <Space />
          {['list', 'setting'].includes(mode) && (
            <>
              {mode === 'list' && (
                <ListOverview data={currentList} selectedIndex={selectedBlockIndex} />
              )}
              {hasSelect && mode === 'setting' && (
                <>
                  <BlockSettings {...props} selectedBlockIndex={selectedBlockIndex} />
                </>
              )}
            </>
          )}
          {mode === 'page-setting' && <PageSetting />}
        </>
      )}
    </div>
  );
};

export default SettingPanel;
