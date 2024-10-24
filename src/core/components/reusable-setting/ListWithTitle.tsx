import * as React from 'react';
import {
  AddOutlined,
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  DeleteOutline,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { nanoid } from 'nanoid';

import { useEditorStore } from '../../..';
import type { DME } from '../../types';
import { PropertyButton } from '../../utils';

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

  const changeTitle = (e: MouseEvent, index: number) => {
    updateBlockByPath(blockPath, (_, block) => {
      if (!block.children) {
        console.error('Tabs children not found!');
        return;
      }
      block.children[index].meta.title = e.target?.innerText;
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
          tabKey: nanoid(),
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
            <div className="flex justify-between">
              <div
                className="hover:border-orange-300 hover:border hover:rounded w-40 p-1"
                onBlur={(e) => changeTitle(e, index)}
                suppressContentEditableWarning
                contentEditable={true}
              >
                {item?.meta.title}
              </div>
              <div className="btn-groups">
                {index !== 0 && (
                  <PropertyButton
                    color="warning"
                    title="move up"
                    onClick={(e) => handleMoveUp(e, index)}
                  >
                    <ArrowUpwardOutlined />
                  </PropertyButton>
                )}
                {index !== value.length - 1 && (
                  <PropertyButton
                    color="warning"
                    title="move down"
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
              </div>
            </div>
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
