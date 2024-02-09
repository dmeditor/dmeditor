import { useEffect } from 'react';
import { Button } from '@mui/material';

import { AddBlockPosition, useEditorStore } from '../store';
import { BlockRender } from './BlockRender';
import emitter from 'Core/utils/event';
import { AddingMessage, AddingTool, BlockListStyle, StyledBlock } from './styled';
import { AddOutlined } from '@mui/icons-material';
import { DMEData } from 'Src/core/types';

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
    addBlockData: { index: addBlockIndex, status: addingStatus, position },
    startAddBlock,
    updateSelectedBlockIndex,
  } = useEditorStore();

  const select = (index: number) => {
    if (selectedBlockIndex !== index) {
      updateSelectedBlockIndex(props.pathArray, index);
    }
  };

  const addBefore = (index: number) => {
    emitter.emit('addBlock', index, 'before');
  };

  const addAfter = (index: number) => {
    emitter.emit('addBlock', index, 'after');
  };

  useEffect(() => {
    emitter.addListener('addBlock', (index: number, position: AddBlockPosition) => {
      startAddBlock(index, position);
    });

    return () => {
      emitter.removeListener('addBlock');
    };
  }, []);


  const renderAddingMessage = ()=>{
    return <AddingMessage>
      Please choose widget.
    </AddingMessage>
  }

  return (
    <BlockListStyle className="dme-blocklist">
      {props.data.map((blockData: DMEData.Block, index: number) => (
      <>
        {addingStatus === 'started' && index === selectedBlockIndex && position === 'before' && (
          renderAddingMessage()
        )}
        <StyledBlock active={index === selectedBlockIndex} className='dme-block-container' onClick={()=>select(index)}>
        {index === selectedBlockIndex && <>
          {addBlockIndex === -Infinity && (
            <AddingTool type='above'>
              <Button onClick={() => addBefore(index)}><AddOutlined /> </Button>
            </AddingTool>
          )}
          </>}
          <BlockRender
            key={blockData.id}
            active={index === selectedBlockIndex}
            data={blockData}
          />
          {/* below is for test */}
        {index === selectedBlockIndex && <>
          {addBlockIndex === -Infinity && (
            <AddingTool>
              <Button onClick={() => addAfter(index)}><AddOutlined /> </Button>
            </AddingTool>
          )}
          </>}
        </StyledBlock>
        {addingStatus === 'started' && index === selectedBlockIndex && position === 'after' && (
          renderAddingMessage()
        )}
      </>
      ))}
    </BlockListStyle>
  );
};
