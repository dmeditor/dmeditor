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

interface BlockWithMousePostionProps {
  isActive?: boolean;
  onSelect: () => void;
  onShowAddingTool: (position: 'before' | 'after' | '') => void;
  children: any;
}

export const BlockListRender = (props: BlockListProps) => {
  const {
    selected: { blockIndex: selectedBlockIndex, currentListPath },
    addBlockData: { index: addBlockIndex, context:addingContext, status: addingStatus, position },
    startAddBlock,
    updateSelectedBlockIndex,
  } = useEditorStore();

  const [addingToolIndex, setAddingToolIndex] = useState(-1);
  const [addingToolPosition, setAddingToolPosition] = useState('');

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

  const addBefore = (e:any, index: number) => {
    e.stopPropagation();
    emitter.emit('addBlock', props.path, index, 'before');
  };

  const addAfter = (e:any, index: number) => {
    e.stopPropagation();
    emitter.emit('addBlock', props.path, index, 'after');
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

  const showAddingTool = (position: string, index: number) => {
    setAddingToolIndex(index);
    setAddingToolPosition(position);
  };

  const renderAddingMessage = () => {
    return <AddingMessage>Please choose widget.</AddingMessage>;
  };

  return (
    <>
      {props.blockData.length === 0 && (
        <div>
          <Button onClick={(e) => addAfter(e, 0)}>Add widget</Button>
        </div>
      )}
      {props.blockData.map((blockData: DMEData.Block, index: number) => {
        const isActive = isInSelectedContext && index === selectedBlockIndex;
        return (
          <React.Fragment key={blockData.id}>
            { addingStatus === 'started' &&
              isInSelectedContext &&
              addBlockIndex === index &&
              position === 'before' &&
              renderAddingMessage()}

            <BlockWithMousePostion
              isActive={isActive}
              onSelect={() => select(index)}
              onShowAddingTool={(position) => showAddingTool(position, index)}
            >
              {addingToolIndex === index && addingToolPosition === 'before' && (
                <AddingTool position="before">
                  <Button onClick={(e) => addBefore(e, index)}>
                    <AddOutlined />{' '}
                  </Button>
                </AddingTool>
              )}
              <BlockRender active={isActive} path={[...props.path, index]} data={blockData} />
              {addingToolIndex === index && addingToolPosition === 'after' && (
                <AddingTool position="after">
                  <Button onClick={(e) => addAfter(e, index)}>
                    <AddOutlined />{' '}
                  </Button>
                </AddingTool>
              )}
            </BlockWithMousePostion>

            { addingStatus === 'started' &&
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

const BlockWithMousePostion = (props: BlockWithMousePostionProps) => {
  const { isActive, onSelect } = props;

  const blockContainerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition(blockContainerRef.current);

  useEffect(() => {
    props.onShowAddingTool(mousePosition);
  }, [mousePosition]);

  return (
    <StyledBlock
      ref={blockContainerRef}
      active={isActive}
      className={containerClasses}
      onClick={(e) => onSelect()}
    >
      {props.children}
    </StyledBlock>
  );
};
