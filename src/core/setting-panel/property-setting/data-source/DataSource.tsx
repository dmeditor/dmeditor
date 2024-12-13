import { Checkbox as MUICheckbox } from '@mui/material';

import { useEditorStore } from '../../../..';
import type { DME, DMEData } from '../../../..';
import { DataSource as DataSourceSettings } from '../../../utility';
import PropertyItem from '../property-item';

const DataSource = (props: DME.SettingComponentProps) => {
  const { property, value, block, blockPath, parameters } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const multi = parameters ? (parameters['multi'] ? true : false) : false;

  const handleChange = (data?: DMEData.DataSourceData) => {
    updateBlockPropsByPath(blockPath, property || '', data);
  };

  return (
    <div>
      <DataSourceSettings
        data={value || {}}
        multi={multi}
        widget={block.type}
        onChange={handleChange}
      />
    </div>
  );
};

export default DataSource;
