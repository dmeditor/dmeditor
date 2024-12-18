import { Checkbox as MUICheckbox } from '@mui/material';

import { useEditorStore } from '../../../..';
import type { DME, DMEData } from '../../../..';
import { DataSource as DataSourceSettings } from '../../../utility';
import PropertyItem from '../property-item';

const DataSource = (props: DME.SettingComponentProps) => {
  const { property, value, block, blockPath, parameters } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const isList = parameters ? (parameters['isList'] ? true : false) : false;

  const handleChange = (data?: DMEData.DataSourceData) => {
    updateBlockPropsByPath(blockPath, property || '', data);
    let dependencyChanged = false;
    if (data && data.type == 'dependency' && block.dependency?.id !== data.sourceData.id) {
      dependencyChanged = true;
    } else if (block.dependency && block.dependency.id !== data?.sourceData.id) {
      dependencyChanged = true;
    }

    if (dependencyChanged) {
      updateBlockPropsByPath(blockPath, '/dependency', data?.sourceData || undefined);
    }
  };

  return (
    <div>
      <DataSourceSettings
        data={value || {}}
        isList={isList}
        widget={block.type}
        onChange={handleChange}
      />
    </div>
  );
};

export default DataSource;
