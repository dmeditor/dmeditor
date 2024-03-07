import React, { useEffect, useRef, useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { Alert, Button } from '@mui/material';
import { sanitizeBlockData } from 'dmeditor/utils/utilx';

import { newBlockData } from '../../../ToolDefinition';
import { BlockRender, RenderMenu } from '../../main/renderer';

interface BlockListProps {
  list: Array<any>;
  columns?: number;
  common?: any;
  active?: boolean;
  settings?: {
    direction?: 'vertical' | 'horizontal'; //if not set, will be vertical
  };
  allowedType?: string[];
  view?: boolean;
  //adding when children is 0
  adding?: boolean;
  onChange: (data: any) => void;
  onActivate?: () => void;
}

export const BlockList = (props: BlockListProps) => {
  const [activeIndex, setActiveIndex] = useState(props.active ? 0 : -1);
  const [list, setList] = useState(props.list || []);
  const listRef = useRef(list); //use ref to avoid data issue when it's debounce change.
  const [adding, setAdding] = useState(props.adding);

  const activate = (index: number) => {
    setActiveIndex(index);
    if (!props.active && props.onActivate) {
      props.onActivate();
    }
  };

  useEffect(() => {
    props.onChange(list);
  }, [list]);

  const addAbove = (type: string, index: number, template?: string) => {
    if (type) {
      const defaultData = newBlockData(type, template);
      let allBlocks = [...list];
      allBlocks.splice(index, 0, defaultData);
      updateData(allBlocks);
      setActiveIndex(index);
    }
  };

  const addUnder = (type: string, index: number, template?: string) => {
    if (type) {
      const defaultData = newBlockData(type, template);
      let allBlocks = [...list];
      allBlocks.splice(index + 1, 0, defaultData);
      updateData(allBlocks);
      setActiveIndex(index + 1);
    }
  };

  const updateData = (listData: any) => {
    setList(listData);
    listRef.current = listData;
  };

  const onDelete = (index: number) => {
    let blocks = [...list];
    blocks.splice(activeIndex, 1);
    updateData(blocks);
    if (activeIndex === 0) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const columnCss =
    props.columns && props.columns > 1 ? ' dm-columns columns-' + props.columns : '';

  return (
    <>
      {!props.view && list.length === 0 && (
        <>
          <div className="dme-message">
            <Alert severity="info">
              {!adding && (
                <>
                  <span>Block is empty. </span>
                  <Button onClick={() => setAdding(true)}>
                    <AddOutlined /> Add
                  </Button>
                </>
              )}
              {adding && <>Please select block in the right menu to add.</>}
            </Alert>
          </div>
          {adding && (
            <RenderMenu
              onAdd={(type: string, template?: string) => {
                addUnder(type, -1, template);
                setAdding(false);
              }}
              onCancel={() => setAdding(false)}
              allowedType={props.allowedType}
            />
          )}
        </>
      )}
      <div className={'dme-blocklist' + columnCss}>
        {list.map((childData, index) => {
          return (
            <div key={childData.id}>
              {props.view && (
                <BlockRender
                  data={childData}
                  active={false}
                  onCancel={() => {}}
                  onActivate={() => {}}
                  onChange={() => {}}
                  onAddAbove={() => {}}
                  onAddUnder={() => {}}
                  view={true}
                />
              )}
              {!props.view && (
                <BlockRender
                  addedType={props.allowedType}
                  onDelete={() => onDelete(index)}
                  onAddUnder={(type: string, template?: string) => addUnder(type, index, template)}
                  onAddAbove={(type: string, template?: string) => addAbove(type, index, template)}
                  siblingDirection={'vertical'}
                  inBlock={true}
                  active={props.active && activeIndex == index ? true : false}
                  onChange={(newData) => {
                    let newList = [...listRef.current];
                    newData = sanitizeBlockData(newData);
                    newList[index] = newData;
                    setList(newList);
                  }}
                  onActivate={() => activate(index)}
                  data={childData}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
