import * as React from 'react';
import { css } from '@emotion/css';
import { Slider } from '@mui/material';
import { DME, DMEData } from 'Src/core/types';
const { useState, useEffect } = React;
import {EntitySampleWidget} from './entity';
import { useEditorStore } from 'Src/core';

export const SampleWidget = (props: DME.WidgetRenderProps<EntitySampleWidget>) => {
  const {
    blockNode: {
      data: { settings },
    },
  } = props;

  const [width, setWidth] = useState(settings.width ?? 300);

  useEffect(() => {
    setWidth(settings.width ?? 300);
  }, [settings.width]);


  const { updateSelectedBlock } = useEditorStore();

  const updateWidth = (e, v)=>{
    updateSelectedBlock<EntitySampleWidget>((data) => {
      data.settings.width = v as number;
    })
  }

  return (
    <div>
      <Slider
        aria-label="Width"
        valueLabelDisplay="auto"
        value={width}
        step={5}
        max={800}
        onChange={updateWidth}
      />

      <div
        style={{ width: width }}
        className={css`
          height: 300px;
          background: ${settings.backgroundColor ?? '#ffe3e3'};
        `}
      >
        Width: {width}
      </div>
    </div>
  );
};

export default SampleWidget;
