import { useEffect } from 'react';
import { css } from '@emotion/css';
import { nanoid } from 'nanoid';

import { WidgetList } from '../components/widget-list/WidgetList';
import { getWidget } from '../components/widgets';
import { useEditorStore } from '../main/store';
import { SettingDescription, SettingHeader } from './style';
import emitter from 'Core/utils/event';

export const AddBlock = () => {
  const {
    addBlockData: { index, position },
    addBlock,
  } = useEditorStore((state) => state);

  const addBlockDone = (type: string) => {
    const widget = getWidget(type);
    if (widget) {
      const blockData = widget.events.createBlock();
      addBlock({
        ...blockData,
        id: `widget-${nanoid()}`,
      });
    }
  };

  return (
    <div>
      <SettingHeader>Add block</SettingHeader>
      <SettingDescription>Please choose a widget</SettingDescription>
      <div>
        <WidgetList onSelect={addBlockDone} />
      </div>
    </div>
  );
};
