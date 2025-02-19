import * as React from 'react';
import { css } from '@emotion/css';
import { MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { BaseText, Editor } from 'slate';
import { useSlate } from 'slate-react';

import { dmeConfig } from '../../../config';
import { editorConfigConverted, isNumber } from '../../../utils';
import { isBlockActive, toggleBlock } from './helper';
import { ToolbarSelect } from './styled';

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
    <ToolbarSelect
      value={currentIndex()}
      sx={{ width: 85 }}
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
          {format === 'heading' && (
            <span
              className={css`
                ${((props: { value: string }) => {
                  if (props.value === 'p') {
                    return {};
                  }
                  return {
                    fontWeight: 'bold',
                    fontSize: { h2: '1.4rem', h3: '1.1rem', h4: '0.9rem', h5: '0.85rem' }[
                      props.value
                    ],
                  };
                })({ value: item.value })}
              `}
            >
              {item.label}
            </span>
          )}
        </MenuItem>
      ))}
    </ToolbarSelect>
  );
};

export default BlockSelector;
