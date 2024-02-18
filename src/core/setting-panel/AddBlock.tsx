import { useEffect } from 'react';
import { css } from '@emotion/css';
import { Cancel, CancelOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';

import { WidgetList } from '../components/widget-list';
import { getWidget, getWidgetVariant, getWidgetWithVariant } from '../components/widgets';
import { useEditorStore } from '../main/store';
import { AddBlockContainer, RightElement, SettingDescription, SettingHeader } from './style';

export const AddBlock = () => {
  const {
    addBlock,
    cancelAdding,
    addBlockData,
  } = useEditorStore((state) => state);

  const addBlockDone = (type: string) => {
    const [widget, variant] = getWidgetWithVariant(type);
    if (widget) {
      let blockData;
      if(variant){
         blockData = variant.getDefaultData?.();
      }else{
         blockData = widget.events.createBlock();
      }
      if(blockData){
        addBlock(blockData);
      }
    }
  };

  const cancel = () => {
    cancelAdding();
  };

  return (
    <AddBlockContainer>
      <RightElement>
        <Button onClick={() => cancel()}>
          <CancelOutlined />
        </Button>
      </RightElement>
      <SettingHeader>Add block</SettingHeader>
      <SettingDescription>Please choose a widget</SettingDescription>
      <div>
        <WidgetList filter={addBlockData?.types} onSelect={addBlockDone} />
      </div>
    </AddBlockContainer>
  );
};
