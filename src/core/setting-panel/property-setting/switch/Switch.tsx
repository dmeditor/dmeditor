import * as React from 'react';
import { Switch } from '@mui/material';

import { DME, useEditorStore } from '../../../..';

const Color = (props: { value?: boolean; property: string } & DME.SettingComponentProps) => {
  const { property, value, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const handleChange = (v: boolean) => {
    updateBlockPropsByPath(blockPath, property || '', v);
  };

  return <Switch checked={value ? true : false} onChange={(e) => handleChange(e.target.checked)} />;
};

export default Color;
