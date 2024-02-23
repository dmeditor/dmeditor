import { BorderAll, BorderClearOutlined, BorderHorizontalOutlined } from '@mui/icons-material';

import { PropertyButton } from 'Core/utils';
import { useEditorStore } from 'Src/core/main/store';

type BorderType = 'none' | 'border' | 'rowBorder';

const alignsList: BorderType[] = ['none', 'rowBorder', 'border'];
const borderIconMap = new Map<BorderType, React.ReactNode>([
  ['none', <BorderClearOutlined />],
  ['rowBorder', <BorderHorizontalOutlined />],
  ['border', <BorderAll />],
]);

export default (props: { property: string; value?: BorderType }) => {
  const { value, property } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  const handleBorderTypeChange = (value: BorderType) => {
    updateSelectedBlockProps(property, value);
  };

  return alignsList.map((format) => {
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
  });
};
