import { useEffect } from 'react';
import { css } from '@emotion/css';
import { Cancel, CancelOutlined } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { nanoid } from 'nanoid';

import { WidgetList } from '../components/widget-list';
import { getWidget, getWidgetVariant, getWidgetWithVariant } from '../components/widgets';
import { useEditorStore } from '../main/store';
import {
  AddBlockContainer,
  AdddBlockHeader,
  RightElement,
  SettingDescription,
  SettingHeader,
  WidgetListContainer,
} from './style';

export const AddBlock = () => {
  const { addBlock, cancelAdding, addBlockData } = useEditorStore((state) => state);

  const addBlockDone = (type: string, style?: string) => {
    addBlock(type, style);
  };

  const cancel = () => {
    cancelAdding();
  };

  return (
    <AddBlockContainer>
      <AdddBlockHeader>
        <RightElement>
          <Button onClick={() => cancel()}>
            <CancelOutlined />
          </Button>
        </RightElement>
        <SettingHeader>Add block</SettingHeader>
        <SettingDescription>Please choose a widget</SettingDescription>
      </AdddBlockHeader>
      <WidgetListContainer>
        <WidgetList filter={addBlockData?.types} onSelect={addBlockDone} />
      </WidgetListContainer>
    </AddBlockContainer>
  );
};
