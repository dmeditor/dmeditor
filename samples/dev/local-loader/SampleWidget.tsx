import * as React from 'react';
import { css } from '@emotion/css';
import { Slider } from '@mui/material';

interface ISampleWidgetProps {
  blockdata: any;
}

const { useState } = React;
export const SampleWidget = (props: ISampleWidgetProps) => {
  ///add status control here
  const [width, setWidth] = useState(300);

  return (
    <div>
      {/* <BlockProperty blocktype={'sample'}>
        <PropertyItem label="Width"> */}
      <Slider
        aria-label="Width"
        valueLabelDisplay="auto"
        defaultValue={width}
        step={5}
        max={800}
        onChange={(e, v) => setWidth(v as number)}
      />
      {/* </PropertyItem>
      </BlockProperty> */}

      <div
        style={{ width: width }}
        className={css`
          height: 300px;
          background: #ffe3e3;
        `}
      >
        {/* {props.blockdata.data} <br /> */}
        Width: {width}
      </div>
    </div>
  );
};

//Define toolSampleWidget
export const toolSampleWidget = {
  type: 'sample',
  name: 'Sample widget',
  category: 'widget',
  icon: 'A',
  // menu: { category: 'basic', icon: <span>A</span> },
  initData: () => {
    return { type: 'sample', data: 'This is a sample.', settings: {} };
  },
  // render: (props: ToolRenderProps) => <SampleWidget {...props} />,
};

export default SampleWidget;
