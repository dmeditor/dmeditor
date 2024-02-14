import React, { useEffect } from 'react';
import { Button } from '@mui/material';

import { AddBlockPosition, useEditorStore } from '../store';
import { BlockRender } from './BlockRender';
import emitter from 'Core/utils/event';
import { AddingMessage, AddingTool, BlockListStyle, StyledBlock } from './styled';
import { AddOutlined } from '@mui/icons-material';
import { DMEData } from 'Src/core/types';

interface BlockListProps {
  blockData: DMEData.BlockList;
  path:Array<number>;
  allowedTypes?: string[];
}

export const BlockListRender = (props: BlockListProps) => {
  const {
    selected: { blockIndex: selectedBlockIndex, currentListPath },
    addBlockData: { index: addBlockIndex, status: addingStatus, position },
    startAddBlock,
    updateSelectedBlockIndex,
  } = useEditorStore();

  const listSelected = props.path.join(',') === currentListPath.join(',');

  const select = (index: number) => {
    if (selectedBlockIndex !== index) {
      updateSelectedBlockIndex(props.path, index);
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

  const renderContainer = (children:React.ReactNode)=>{
    return <BlockListStyle className="dme-blocklist">{children}</BlockListStyle>
  }

  return <>   
    {props.blockData.length===0&&<div>
      <Button onClick={()=>addAfter(0)}>Add widget</Button>  
    </div>}
    {props.blockData.map((blockData: DMEData.Block, index: number) => {
      const isActive = listSelected && index === selectedBlockIndex;
      return <React.Fragment key={blockData.id}>
      { isActive && addingStatus === 'started' && position === 'before' && (
        renderAddingMessage()
      )}
      <StyledBlock active={isActive} className='dme-block-container' onClick={()=>select(index)}>
      {isActive && <>
        {addBlockIndex === -Infinity && (
          <AddingTool type='above'>
            <Button onClick={() => addBefore(index)}><AddOutlined /> </Button>
          </AddingTool>
        )}
        </>}
        <BlockRender
          key={blockData.id}
          active={isActive}
          path = {[...props.path, index]}
          data={blockData}
        />
        {/* below is for test */}
      {isActive && <>
        {addBlockIndex === -Infinity && (
          <AddingTool>
            <Button onClick={() => addAfter(index)}><AddOutlined /> </Button>
          </AddingTool>
        )}
        </>}
      </StyledBlock>
      { isActive && addingStatus === 'started' && position === 'after' && (
        renderAddingMessage()
      )}
    </React.Fragment>
    })}
  </>
};
