import { css } from '@emotion/css';

import { WidgetList } from '../components/widget-list/WidgetList';
import { SettingDescription, SettingHeader } from './style';
import emitter from 'Core/utils/event';
import { useEffect } from 'react';
import { useEditorStore } from '../main/store';
import { nanoid } from 'nanoid';

export const AddBlock = () => {

  const {
    addBlockData:{index, position},
    addBlock
  } = useEditorStore((state) => state);

  const addBlockDone = (type:string)=>{
    console.log('adding');
      addBlock(
        {
          id: `widget-${nanoid()}`,
          value: 'This is a heading added',
          settings:{
            level: 5,
            value: ''
          },
          type: 'Heading',      
        }   
      )
  }
  

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
