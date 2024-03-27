import * as React from 'react';
import { MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { dmeConfig } from 'dmeditor/config';
import { isNumber } from 'dmeditor/utils';
import { BaseText, Editor } from 'slate';
import { useSlate } from 'slate-react';

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
  // const { active } = isMarkActive(editor, format);
  Editor.removeMark(editor, format);
  Editor.addMark(editor, format, value);
};

export const getValue = (index: number, type: SelectorType) => {
  const list =
    type === 'font-size'
      ? dmeConfig.editor.richText.fontSize
      : dmeConfig.editor.richText.fontFamily;
  if (index < 0 || index >= list.length) {
    return list[0];
  }
  return list[index];
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
      return dmeConfig.editor.richText.fontSize;
    } else {
      return dmeConfig.editor.richText.fontFamily;
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
      const index = types.findIndex((item) => item === value);
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
        <MenuItem key={font} value={index}>
          {format === 'font-family' && <span style={{ fontFamily: `${font}` }}>{font}</span>}
          {format === 'font-size' && <span>{font}</span>}
        </MenuItem>
      ))}
    </Select>
  );
};

export default MarkSelector;
