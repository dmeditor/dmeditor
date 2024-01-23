import { useEffect } from 'react';
import { Button } from '@mui/material';

import { DMEData } from '../../components/types/blocktype';
import { AddBlockPosition, useEditorStore } from '../store';
import { BlockRender } from './BlockRender';
import emitter from 'Core/utils/event';

interface BlockListProps {
  data: DMEData.BlockList;
  selected: number;
  pathArray:Array<number>;
  columns?: number;
  active?: boolean;
  settings?: {
    direction?: 'vertical' | 'horizontal'; //if not set, will be vertical
  };
  allowedType?: string[];
  view?: boolean;
  //adding when children is 0
  adding?: boolean;
  onActivate?: () => void;
}

export const BlockListRender = (props: BlockListProps) => {
  const {
    selected: { blockIndex: selectedBlockIndex },
    addBlockData: { index: addBlockIndex, status: addingStatus },
    startAddBlock,
    updateSelectedBlockIndex,
  } = useEditorStore();

  const select = (index: number) => {
    if (selectedBlockIndex !== index) {
      updateSelectedBlockIndex(props.pathArray, index);
    }
  };

  const addAfter = (index: number) => {
    emitter.emit('addBlockAfter', index, 'after');
  };

  useEffect(() => {
    emitter.addListener('addBlockAfter', (index: number, position: AddBlockPosition) => {
      startAddBlock(index, position);
    });

    return () => {
      emitter.removeListener('addBlockAfter');
    };
  }, []);

  return (
    <div className="dme-blocklist">
      {props.data.map((blockData: DMEData.Block, index: number) => (
        <>
          <BlockRender
            key={blockData.id}
            onActivate={() => select(index)}
            active={index === selectedBlockIndex}
            data={blockData}
          />
          {/* below is for test */}
          {index === selectedBlockIndex && <>          
          {addBlockIndex === -Infinity && (
            <div style={{ textAlign: 'center' }}>
              <Button onClick={() => addAfter(index)}>Add</Button>
            </div>
          )}
          {addingStatus === 'started' && (
            <div style={{color: '#cccccc', padding:10, background:'#f0f0f0'}}>
              Please choose widget.
            </div>
          )}
          </>}
        </>
      ))}
    </div>
  );
};
