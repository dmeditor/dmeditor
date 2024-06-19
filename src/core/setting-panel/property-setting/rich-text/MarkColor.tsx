import * as React from 'react';
import { css } from '@emotion/css';
import { BaseText, Editor } from 'slate';
import { useSlate } from 'slate-react';

import { PickColor, useRecentColors } from '../../../utils';

type ColorType = 'color';

type MarksWithFontFamily = Omit<BaseText, 'text'> & { [key: string]: any };
const { useState } = React;

const isMarkActive = (editor: Editor, format: ColorType) => {
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

const toggleMark = (editor: Editor, format: ColorType, value: string) => {
  // const { active } = isMarkActive(editor, format);
  Editor.removeMark(editor, value);
  Editor.addMark(editor, format, value);
};

const isSelected = (editor: Editor, format: ColorType, color: string) => {
  const { selection } = editor;
  if (!selection) return false;

  toggleMark(editor, format, color);
};

const MarkColor = (props: { format: ColorType }) => {
  const { format } = props;
  const editor = useSlate();
  const { recentColors, handleUpdateRecentColors } = useRecentColors();
  const [color, setColor] = useState('');

  const handleChange = (color?: string) => {
    setColor(color ?? '');
    isSelected(editor, format, color ?? '');
  };

  const currentValue = () => {
    const { active, [format]: value } = isMarkActive(editor, format);
    if (active) {
      return value;
    } else {
      return '';
    }
  };

  return (
    <div
      className={css`
        display: inline-block;
        vertical-align: middle;
      `}
    >
      <PickColor
        color={currentValue()}
        onChange={handleChange}
        recentColors={recentColors}
        onChangeComplete={handleUpdateRecentColors}
      />
    </div>
  );
};

export default MarkColor;
