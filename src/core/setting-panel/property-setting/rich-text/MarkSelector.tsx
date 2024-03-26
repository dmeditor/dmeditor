import * as React from 'react';
import { MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { isNumber } from 'dmeditor/utils';
import { BaseText, Editor } from 'slate';
import { useSlate } from 'slate-react';

import { FONT_FAMILY_TYPES, FONT_SIZE_TYPES } from './options';

type SelectorType = 'font-size' | 'font-family';

type MarksWithFontFamily = Omit<BaseText, 'text'> & { [key: string]: any };
const { useState, useMemo } = React;

const isMarkActive = (editor: Editor, format: SelectorType) => {
  const marks = Editor.marks(editor) as MarksWithFontFamily;
  if (!marks) {
    return {
      active: false,
      [format]: '',
    };
  }
  return {
    active: marks[format] ? true : false,
    [format]: marks[format] || '',
  };
};

const toggleMark = (editor: Editor, format: SelectorType, value: string) => {
  const { active } = isMarkActive(editor, format);
  if (active) {
    Editor.removeMark(editor, value);
  } else {
    Editor.addMark(editor, format, value);
  }
};

export const getValue = (index: number, type: SelectorType) => {
  const list = type === 'font-size' ? FONT_SIZE_TYPES : FONT_FAMILY_TYPES;
  if (index < 0 || index >= list.length) {
    return list[0].value;
  }
  return list[index].value;
};

const isSelected = (editor: Editor, format: SelectorType, selectedIndex: number) => {
  const { selection } = editor;
  if (!selection) return false;

  const value = getValue(selectedIndex, format);
  toggleMark(editor, format, value);
};

const MarkSelector = (props: { format: SelectorType }) => {
  const { format } = props;
  const editor = useSlate();
  const [_, setIndex] = useState(0);

  const types = useMemo(() => {
    if (format === 'font-size') {
      return FONT_SIZE_TYPES;
    } else {
      return FONT_FAMILY_TYPES;
    }
  }, [format]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const index = event.target.value;
    if (!isNumber(index)) return;
    setIndex(index);

    isSelected(editor, format, index);
  };

  const currentValue = () => {
    const { active, [format]: value } = isMarkActive(editor, format);
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
        fontSize: '12px',
        padding: '0px',
        margin: '0px',
      }}
      value={currentValue()}
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
          {font.value}
        </MenuItem>
      ))}
    </Select>
  );
};

export default MarkSelector;
