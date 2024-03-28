import * as React from 'react';
import { css } from '@emotion/css';
import { PickColor } from 'dmeditor/utils';
import { BaseText, Editor } from 'slate';
import { useSlate } from 'slate-react';

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
  const [_, setColor] = useState('');

  const handleChange = (color: string) => {
    setColor(color);
    isSelected(editor, format, color);
  };

  const currentValue = () => {
    const { active, [format]: value } = isMarkActive(editor, format);
    if (active) {
      return value;
    } else {
      return '#000000';
    }
  };

  return (
    <div
      className={css`
        display: inline-block;
        vertical-align: middle;
      `}
    >
      <PickColor color={currentValue()} onChange={handleChange} />
    </div>
  );
};

export default MarkColor;
