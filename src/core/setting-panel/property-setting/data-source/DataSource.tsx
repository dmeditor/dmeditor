import { Checkbox as MUICheckbox } from '@mui/material';

import { useEditorStore } from '../../../..';
import type { DME, DMEData } from '../../../..';
import { DataSource as DataSourceSettings } from '../../../utility';
import PropertyItem from '../property-item';

const DataSource = (props: DME.SettingComponentProps) => {
  const { property, value, block, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const handleChange = (data?: DMEData.DataSourceData) => {
    updateBlockPropsByPath(blockPath, property || '', data);
  };

  return (
    <div>
      <DataSourceSettings data={value || {}} widget={block.type} onChange={handleChange} />
    </div>
  );
};

export default DataSource;
