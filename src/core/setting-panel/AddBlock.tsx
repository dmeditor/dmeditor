import { useEffect } from 'react';
import { css } from '@emotion/css';
import { Cancel, CancelOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';

import { WidgetList } from '../components/widget-list';
import { getWidget } from '../components/widgets';
import { useEditorStore } from '../main/store';
import { AddBlockContainer, RightElement, SettingDescription, SettingHeader } from './style';
import emitter from 'Core/utils/event';

export const AddBlock = () => {
  const {
    addBlockData: { index, position },
    addBlock,
    cancelAdding,
  } = useEditorStore((state) => state);

  const addBlockDone = (type: string) => {
    const widget = getWidget(type);
    if (widget) {
      const blockData = widget.events.createBlock();
      addBlock({
        id: `widget-${nanoid()}`,
        data: blockData,
        type: type,
      });
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
        <WidgetList onSelect={addBlockDone} />
      </div>
    </AddBlockContainer>
  );
};
