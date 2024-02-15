import React, { useEffect, useRef, useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

import { useMousePosition } from '../hooks/useMousePosition';
import { AddBlockPosition, useEditorStore } from '../store';
import { BlockRender } from './BlockRender';
import { AddingMessage, AddingTool, BlockListStyle, StyledBlock } from './styled';
import emitter from 'Core/utils/event';
import { DMEData } from 'Src/core/types';

interface BlockListProps {
  blockData: DMEData.BlockList;
  path: Array<number>;
  allowedTypes?: string[];
  isInternal?: boolean;
}

interface BlockWithAddingProps {
  isActive?: boolean;
  onSelect: () => void;
  onAddClick: (position: 'before' | 'after') => void;
  children: any;
}

export const BlockListRender = (props: BlockListProps) => {
  const {
    selected: { blockIndex: selectedBlockIndex, currentListPath },
    addBlockData: { index: addBlockIndex, status: addingStatus, position },
    startAddBlock,
    updateSelectedBlockIndex,
  } = useEditorStore();

  const isInSelectedContext = currentListPath.join(',') === props.path.join(',');

  const isUnder = () => {
    //check if props.path in selected context
    let result = true;
    currentListPath.forEach((item) => {
      if (!props.path.includes(item)) {
        result = false;
      }
    });
    return result;
  };

  const select = (index: number) => {
    updateSelectedBlockIndex(props.path, index);
  };

  useEffect(() => {
    emitter.addListener(
      'addBlock',
      (context: Array<number>, index: number, position: AddBlockPosition) => {
        startAddBlock(context, index, position);
      },
    );

    return () => {
      emitter.removeListener('addBlock');
    };
  }, []);

  const addButtonHandle = (position: 'before' | 'after', index: number) => {
    emitter.emit('addBlock', props.path, index, position);
  };

  const renderAddingMessage = () => {
    return <AddingMessage>Please choose widget.</AddingMessage>;
  };

  return (
    <>
      {props.blockData.length === 0 && (
        <div>
          <Button onClick={(e) => addButtonHandle('after', 0)}>Add widget</Button>
        </div>
      )}
      {props.blockData.map((blockData: DMEData.Block, index: number) => {
        const isActive = isInSelectedContext && index === selectedBlockIndex;
        return (
          <React.Fragment key={blockData.id}>
            {/* todo: move this to BlockWithAdding */}
            {addingStatus === 'started' &&
              isInSelectedContext &&
              addBlockIndex === index &&
              position === 'before' &&
              renderAddingMessage()}

            <BlockWithAdding
              isActive={isActive}
              onSelect={() => select(index)}
              onAddClick={(position) => addButtonHandle(position, index)}
            >
              <BlockRender active={isActive} path={[...props.path, index]} data={blockData} />
            </BlockWithAdding>

            {addingStatus === 'started' &&
              addBlockIndex === index &&
              isInSelectedContext &&
              position === 'after' &&
              renderAddingMessage()}
          </React.Fragment>
        );
      })}
    </>
  );
};

const containerClasses = 'dme-block-container';

const BlockWithAdding = (props: BlockWithAddingProps) => {
  const { isActive, onSelect, onAddClick } = props;

  const blockContainerRef = useRef<HTMLDivElement>(null);
  const addPosition = useMousePosition(blockContainerRef.current);

  const addButtonClicked = (e: any) => {
    e.stopPropagation();
    if (addPosition) {
      onAddClick(addPosition);
    }
  };

  return (
    <StyledBlock
      ref={blockContainerRef}
      active={isActive}
      className={containerClasses}
      onClick={(e) => onSelect()}
    >
      {addPosition === 'before' && (
        <AddingTool position="before">
          <Button onClick={addButtonClicked}>
            <AddOutlined />{' '}
          </Button>
        </AddingTool>
      )}
      {props.children}
      {addPosition === 'after' && (
        <AddingTool position="after">
          <Button onClick={addButtonClicked}>
            <AddOutlined />{' '}
          </Button>
        </AddingTool>
      )}
    </StyledBlock>
  );
};
