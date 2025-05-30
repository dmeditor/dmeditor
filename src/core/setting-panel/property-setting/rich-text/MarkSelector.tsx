import * as React from 'react';
import { MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { BaseText, Editor } from 'slate';
import { useSlate } from 'slate-react';

import { dmeConfig } from '../../../config';
import { editorConfigConverted, isNumber } from '../../../utils';
import { ToolbarSelect } from './styled';

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
  if (value) {
    Editor.addMark(editor, format, value);
  }
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
  toggleMark(editor, format, value);
};

const MarkSelector = (props: { format: SelectorType }) => {
  const { format } = props;
  const editor = useSlate();
  const [_, setIndex] = useState(0);

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
    <ToolbarSelect
      sx={{
        width: { 'font-family': 80, 'font-size': 60 }[props.format] || 100,
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
      {types.map((item, index) => (
        <MenuItem key={item.value} value={index}>
          {format === 'font-family' && (
            <span style={index > 0 ? { fontFamily: `${item.value}` } : {}}>{item.label}</span>
          )}
          {format === 'font-size' && <span>{item.label}</span>}
        </MenuItem>
      ))}
    </ToolbarSelect>
  );
};

export default MarkSelector;
