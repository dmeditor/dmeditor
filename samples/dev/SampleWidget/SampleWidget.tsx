import * as React from 'react';
import { css } from '@emotion/css';
import { Slider } from '@mui/material';

import { useEditorStore } from 'Src/core/main/store';
import { DMEData } from 'Src/core/types';

interface EnitySampleWidget {
  settings: {
    width: number;
    backgroundColor?: string;
  };
}

interface ISampleWidgetProps {
  blockNode: DMEData.Block & { data: EnitySampleWidget };
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

  return (
    <div>
      <Slider
        aria-label="Width"
        valueLabelDisplay="auto"
        value={width}
        step={5}
        max={800}
        onChange={(e, v) => updateSelectedBlockProps('settings.width', v as number)}
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
