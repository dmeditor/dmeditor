import * as React from 'react';
import { FormatAlignCenter, FormatAlignLeft, FormatAlignRight } from '@mui/icons-material';

import { PropertyButton } from 'Core/utils';
import { useEditorStore } from 'Src/core/main/store';

export type AlignType = 'left' | 'center' | 'right';
const alignsList: AlignType[] = ['left', 'center', 'right'];

const Align = (props: { property: string; value?: AlignType }) => {
  const { value, property } = props;
  const { updateSelectedBlockProps } = useEditorStore();

  const BlockButton = ({ formats }: { formats: AlignType }) => {
    const ele: React.ReactNode = null;
    if (formats === 'left') return <FormatAlignLeft />;
    if (formats === 'center') return <FormatAlignCenter />;
    if (formats === 'right') return <FormatAlignRight />;
    return ele;
  };

  const handleAlignChange = (value: AlignType) => {
    updateSelectedBlockProps(property, value);
  };

  return alignsList.map((format) => {
    return (
      <PropertyButton
        title={format}
        key={format}
        onClick={() => handleAlignChange(format)}
        selected={value === format}
      >
        <BlockButton formats={format} />
      </PropertyButton>
    );
  });
};

export default Align;
