import { BorderAll, BorderClearOutlined, BorderHorizontalOutlined } from '@mui/icons-material';

import { DME, useEditorStore } from '../../..';
import { PropertyButton, PropertyItem } from '../../../core/utils';
import { EntityTableBlock } from '../entity';

type BorderType = 'none' | 'border' | 'rowBorder';

const alignsList: BorderType[] = ['none', 'rowBorder', 'border'];
const borderIconMap = new Map<BorderType, React.ReactNode>([
  ['none', <BorderClearOutlined />],
  ['rowBorder', <BorderHorizontalOutlined />],
  ['border', <BorderAll />],
]);

export const TableBorderType = (props: DME.SettingComponentProps<EntityTableBlock>) => {
  const { value, property, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const handleBorderTypeChange = (value: BorderType) => {
    updateBlockPropsByPath(blockPath, property!, value);
  };

  return (
    <PropertyItem label="BorderType">
      {alignsList.map((format) => {
        return (
          <PropertyButton
            title={format}
            key={format}
            onClick={() => handleBorderTypeChange(format)}
            selected={value === format}
          >
            {borderIconMap.get(format)}
          </PropertyButton>
        );
      })}
    </PropertyItem>
  );
};
