import * as React from 'react';
import { css } from '@emotion/css';
import { FormatAlignCenter, FormatAlignLeft, FormatAlignRight } from '@mui/icons-material';

import { DME, useEditorStore } from '../../../..';
import { PropertyButton } from '../../../utils';

export type AlignType = 'left' | 'center' | 'right';
const alignsList: AlignType[] = ['left', 'center', 'right'];

const Align = (props: DME.SettingComponentProps) => {
  const { value, property, blockPath } = props;
  const { updateBlockPropsByPath } = useEditorStore();

  const BlockButton = ({ formats }: { formats?: AlignType }) => {
    const ele: React.ReactNode = null;
    if (formats === 'left') return <FormatAlignLeft />;
    if (formats === 'center') return <FormatAlignCenter />;
    if (formats === 'right') return <FormatAlignRight />;
    return ele;
  };

  const handleAlignChange = (value?: AlignType) => {
    updateBlockPropsByPath(blockPath, property!, value);
  };

  return (
    <div
      className={css`
        display: flex;
        gap: 3px;
      `}
    >
      {alignsList.map((format) => {
        return (
          <PropertyButton
            title={format}
            key={format}
            onClick={() => {
              if (value !== format) {
                handleAlignChange(format);
              } else {
                handleAlignChange(undefined);
              }
            }}
            selected={value === format}
          >
            <BlockButton formats={format} />
          </PropertyButton>
        );
      })}
    </div>
  );
};

export default Align;
