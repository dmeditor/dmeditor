import * as React from 'react';
import { css } from '@emotion/css';
import { Slider } from '@mui/material';

import { useEditorStore } from 'Src/core/main/store';

interface ISampleWidgetProps {
  blockNode: any;
}

const { useState, useEffect } = React;
export const SampleWidget = (props: ISampleWidgetProps) => {
  ///add status control here
  const {
    blockNode: {
      data: { settings },
    },
  } = props;
  const [width, setWidth] = useState(settings.width ?? 300);
  useEffect(() => {
    setWidth(settings.width ?? 300);
  }, [settings.width]);
  const { updateSelectedBlockProps } = useEditorStore();
  // const { updateSelectedBlockProps } = useEditor();

  return (
    <div>
      <Slider
        aria-label="Width"
        valueLabelDisplay="auto"
        value={width}
        step={5}
        max={800}
        //onChange={(e, v) => setWidth(v as number)}
        onChange={(e, v) => updateSelectedBlockProps('settings.width', v as number)}
      />

      <div
        style={{ width: width }}
        className={css`
          height: 300px;
          background: ${settings.backgroundColor ?? '#ffe3e3'};
        `}
      >
        {/* {props.blockdata.data} <br /> */}
        Width: {width}
      </div>
    </div>
  );
};

export default SampleWidget;
