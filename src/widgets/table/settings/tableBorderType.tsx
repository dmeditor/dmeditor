import { BorderAll, BorderClearOutlined, BorderHorizontalOutlined } from '@mui/icons-material';

import { useEditorStore } from '../../../core';
import { PropertyButton, PropertyItem } from '../../../core/utils';

type BorderType = 'none' | 'border' | 'rowBorder';

const alignsList: BorderType[] = ['none', 'rowBorder', 'border'];
const borderIconMap = new Map<BorderType, React.ReactNode>([
  ['none', <BorderClearOutlined />],
  ['rowBorder', <BorderHorizontalOutlined />],
  ['border', <BorderAll />],
]);

export const TableBorderType = (props: { property: string; value?: BorderType }) => {
  const { value, property } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  const handleBorderTypeChange = (value: BorderType) => {
    updateSelectedBlockProps(property, value);
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
