import * as React from 'react';
import { MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { BaseText, Editor } from 'slate';
import { useSlate } from 'slate-react';

import { HeadingComponent } from '../../../../core/utility/HeadingComponent';
import { dmeConfig } from '../../../config';
import { editorConfigConverted, isNumber } from '../../../utils';
import { isBlockActive, toggleBlock } from './helper';

type SelectorType = 'heading';

const { useState, useMemo } = React;

const isSelectorBlockActive = (editor: Editor, format: SelectorType, index: number) => {
  const value = getValue(index, format);
  const active = isBlockActive(editor, value);

  return {
    active,
    value,
  };
};

const toggleSelectorBlock = (editor: Editor, value: string) => {
  toggleBlock(editor, value);
};

const getEditorPropList = (type: SelectorType) => {
  const editorProp = editorConfigConverted(type);
  if (!editorProp) return [];
  if (!(editorProp in dmeConfig.editor)) return [];
  const list = dmeConfig.editor[editorProp];
  if (!Array.isArray(list)) return [];
  if (!list.every((item) => typeof item === 'object' && 'value' in item && 'label' in item))
    return [];
  return list;
};

export const getValue = (index: number, type: SelectorType) => {
  const list = getEditorPropList(type);
  if (index < 0 || index >= list.length) {
    list[0].value;
  }

  return list[index].value;
};

const isSelected = (editor: Editor, format: SelectorType, selectedIndex: number) => {
  const { selection } = editor;
  if (!selection) return false;
  const value = getValue(selectedIndex, format);
  toggleSelectorBlock(editor, value);
};

const BlockSelector = (props: { format: SelectorType }) => {
  const { format } = props;
  const editor = useSlate();
  const [index, setIndex] = useState(0);

  const types = useMemo(() => {
    return getEditorPropList(format);
  }, [format]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const index = event.target.value;
    if (!isNumber(index)) return;
    setIndex(index);

    isSelected(editor, format, index);
  };

  const currentIndex = () => {
    const { active, value } = isSelectorBlockActive(editor, format, index);
    if (active) {
      const index = types.findIndex((item) => item.value === value);
      if (index === -1) {
        return 0;
      }
      return isNumber(index) ? index : 0;
    } else {
      return 0;
    }
  };

  return (
    <Select
      sx={{
        width: '100px',
        height: '30px',
        fontSize: '14px',
        padding: '0px',
        marginLeft: '4px',
      }}
      value={currentIndex()}
      onChange={handleChange}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 48 * 4.5,
          },
        },
      }}
    >
      {types.map((font, index) => (
        <MenuItem key={font.value} value={index}>
          {format === 'heading' && (
            <HeadingComponent
              style={{
                margin: 0,
              }}
              level={Number(font.value.replace(/h/g, ''))}
              children={font.label}
            />
          )}
        </MenuItem>
      ))}
    </Select>
  );
};

export default BlockSelector;
