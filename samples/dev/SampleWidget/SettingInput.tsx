import * as React from 'react';
import { TextField } from '@mui/material';
import { useEditorStore } from 'dmeditor/index';
import { DME } from 'dmeditor/types';

import { EntitySampleWidget } from './entity';

const SettingInput = (props: DME.SettingComponentProps) => {
  const { property, value } = props;
  const { getSelectedBlock, updateSelectedBlockProps } = useEditorStore();

  //Get block data
  const blockData = getSelectedBlock<EntitySampleWidget>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //update data with dynamic property
    updateSelectedBlockProps(property, e.target.value);
  };

  return (
    <div>
      <TextField onChange={handleChange} value={value} />
      {/* Show background color instead */}
      Color: {blockData?.data.settings.backgroundColor}
    </div>
  );
};

export default SettingInput;
