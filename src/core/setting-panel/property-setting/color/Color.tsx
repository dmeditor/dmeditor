import * as React from 'react';

import { DME, useEditorStore } from '../../../..';
import { PickColor } from '../../../utils';

const Color = (props: { value?: string; property: string } & DME.SettingComponentProps) => {
  const { property, value, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  return (
    <PickColor
      color={value ? value : ''}
      onChange={(value) => {
        updateBlockPropsByPath(blockPath, property, value);
      }}
    ></PickColor>
  );
};

export default Color;
