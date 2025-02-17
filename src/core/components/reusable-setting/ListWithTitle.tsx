import * as React from 'react';
import {
  AddOutlined,
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  DeleteOutline,
} from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { nanoid } from 'nanoid';

import { useEditorStore } from '../../..';
import type { DME } from '../../types';
import { PropertyButton } from '../../utils';
import { CellOperation, Row } from './styled';

const ListWithTitle = (props: DME.SettingComponentProps) => {
  const {
    block: { children: value },
    blockPath,
  } = props;

  const { updateBlockByPath } = useEditorStore();
  const handleMoveUp = (e: MouseEvent, index: number) => {
    updateBlockByPath(blockPath, (_, block) => {
      if (!block.children) {
        console.error('Tabs children not found!');
        return;
      }
      const temp = block.children[index];
      block.children[index] = block.children[index - 1];
      block.children[index - 1] = temp;
    });
  };
  const handleMoveDown = (e: MouseEvent, index: number) => {
    updateBlockByPath(blockPath, (_, block) => {
      if (!block.children) {
        console.error('Tabs children not found!');
        return;
      }
      const temp = block.children[index];
      block.children[index] = block.children[index + 1];
      block.children[index + 1] = temp;
    });
  };

  const changeItemValue = (value: string, index: number, type: 'title' | 'tabKey') => {
    updateBlockByPath(blockPath, (_, block) => {
      if (!block.children) {
        console.error('Tabs children not found!');
        return;
      }
      if (type === 'title') {
        block.children[index].meta.title = value;
      } else {
        block.children[index].meta.tabKey = value;
      }
    });
  };

  const handleDelete = (e, index) => {
    updateBlockByPath(blockPath, (_, block) => {
      if (!block.children) {
        console.error('Tabs children not found!');
        return;
      }
      block.children.splice(index, 1);
    });
  };

  const addUnder = () => {
    updateBlockByPath(blockPath, (_, block) => {
      if (!block.children) {
        return;
      }
      block.children.push({
        meta: {
          tabKey: 't' + (block.children.length + 1),
          title: 'New',
        },
        children: [
          {
            type: 'text',
            id: nanoid(),
            data: {
              value: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Sample text' }],
                },
              ],
            },
          },
        ],
      });
    });
  };

  return (
    <div>
      {Array.isArray(value) && (
        <div>
          {value.map((item, index) => (
            <Row key={item?.meta?.tabKey || ''}>
              <TextField
                defaultValue={item?.meta.title}
                onBlur={(e) => changeItemValue(e.target.value, index, 'title')}
              />
              <TextField
                defaultValue={item?.meta.tabKey}
                style={{ width: 50 }}
                title="Key"
                onBlur={(e) => changeItemValue(e.target.value, index, 'tabKey')}
              />
              <CellOperation>
                {index !== 0 && (
                  <PropertyButton
                    color="warning"
                    title="Move up"
                    onClick={(e) => handleMoveUp(e, index)}
                  >
                    <ArrowUpwardOutlined />
                  </PropertyButton>
                )}
                {index !== value.length - 1 && (
                  <PropertyButton
                    color="warning"
                    title="Move down"
                    onClick={(e) => handleMoveDown(e, index)}
                  >
                    <ArrowDownwardOutlined />
                  </PropertyButton>
                )}
                <PropertyButton
                  color="warning"
                  title="Delete"
                  onClick={(e) => handleDelete(e, index)}
                >
                  <DeleteOutline />
                </PropertyButton>
              </CellOperation>
            </Row>
          ))}
        </div>
      )}
      <IconButton title="Add" onClick={() => addUnder()}>
        <AddOutlined />
      </IconButton>
    </div>
  );
};

export default ListWithTitle;
