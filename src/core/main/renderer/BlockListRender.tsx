import React, { useEffect, useRef, useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

import { useMousePosition } from '../hooks/useMousePosition';
import { AddBlockParameters, AddBlockPosition, useEditorStore } from '../store';
import { BlockRender } from './BlockRender';
import {
  AddingMessage,
  AddingTool,
  BlockListStyle,
  StyledAddWidgetButton,
  StyledBlock,
  StyledButtonContainer,
} from './styled';
import emitter from 'Core/utils/event';
import { DMEData } from 'Src/core/types/dmeditor';

interface BlockListProps {
  blockData: DMEData.BlockList;
  path: Array<number>;
  allowedTypes?: string[] | string;
  isInternal?: boolean;
  direction?: 'vertical' | 'horizontal';
}

interface BlockWithAddingProps {
  isActive?: boolean;
  isHovering?: boolean;
  onSelect: () => void;
  onAddClick: (position: 'before' | 'after') => void;
  children: any;
  addingHorizontal?: boolean;
}

export const BlockListRender = (props: BlockListProps) => {
  const {
    selected: { blockIndex: selectedBlockIndex, currentListPath },
    addBlockData,
    addBlock,
    startAddBlock,
    clearAdding,
    updateSelectedBlockIndex,
    hoverPath,
  } = useEditorStore();

  const { status: globalAddingStatus } = addBlockData || {};
  const isInSelectedContext = currentListPath.join(',') === props.path.join(',');

  const [addParameters, setAddParameters] = useState<{
    position: AddBlockPosition;
    index: number;
  }>();

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
    updateSelectedBlockIndex([...props.path, index], props.blockData[index].id || '');
  };

  //register event
  useEffect(() => {
    emitter.addListener('addBlock', (parameters: AddBlockParameters) => {
      startAddBlock(parameters.context, parameters.index, parameters.position, parameters.types);
      //todo: move this into zustand
      if (parameters.types?.length === 1) {
        addBlock(parameters.types[0]);
      }
    });

    return () => {
      emitter.removeListener('addBlock');
    };
  }, []);

  //only changed when there is addParameters( add button is clicked )
  const depsAddingStatus = addParameters ? globalAddingStatus : '';

  //trigger state change when it's done.
  useEffect(() => {
    //done
    if (globalAddingStatus === 'done') {
      setAddParameters(undefined);
      clearAdding();
    }
  }, [depsAddingStatus]);

  const handleAdding = (position: 'before' | 'after', index: number) => {
    const parameters = {
      index: index,
      position: position,
    };
    setAddParameters(parameters);
    emitter.emit('addBlock', {
      ...parameters,
      context: props.path,
      status: 'started',
      types: props.allowedTypes,
    });
  };

  const renderAddingMessage = () => {
    return <AddingMessage>Please choose widget.</AddingMessage>;
  };

  return (
    <>
      {props.blockData.length === 0 && (
        <StyledAddWidgetButton>
          <Button onClick={(e) => handleAdding('after', 0)}>Add widget</Button>
        </StyledAddWidgetButton>
      )}
      {props.blockData.map((blockData: DMEData.Block, index: number) => {
        const isActive = isInSelectedContext && index === selectedBlockIndex;
        return (
          <React.Fragment key={blockData.id}>
            {addParameters &&
              isInSelectedContext &&
              addParameters.index === index &&
              addParameters.position === 'before' &&
              renderAddingMessage()}
            <BlockWithAdding
              isActive={isActive}
              isHovering={hoverPath?.join(',') === [...props.path, index].join(',')}
              addingHorizontal={props.direction === 'horizontal'}
              onSelect={() => select(index)}
              onAddClick={(position) => handleAdding(position, index)}
            >
              <BlockRender active={isActive} path={[...props.path, index]} data={blockData} />
            </BlockWithAdding>

            {addParameters &&
              isInSelectedContext &&
              addParameters.index === index &&
              addParameters.position === 'after' &&
              renderAddingMessage()}
          </React.Fragment>
        );
      })}
    </>
  );
};

const containerAdditionalProps = { className: 'dme-block-container' };

const BlockWithAdding = (props: BlockWithAddingProps) => {
  const { isActive, isHovering, onSelect, onAddClick, addingHorizontal } = props;

  const blockContainerRef = useRef<HTMLDivElement>(null);
  const addPosition = useMousePosition(blockContainerRef.current, addingHorizontal);

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
      hovering={isHovering}
      {...containerAdditionalProps}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {addPosition === 'before' && (
        <AddingTool position="before" horizontal={addingHorizontal}>
          <StyledButtonContainer>
            <Button onClick={addButtonClicked} sx={{ backgroundColor: '#fffff' }}>
              <AddOutlined />{' '}
            </Button>
          </StyledButtonContainer>
        </AddingTool>
      )}
      {props.children}
      {addPosition === 'after' && (
        <AddingTool position="after" horizontal={addingHorizontal}>
          <StyledButtonContainer>
            <Button onClick={addButtonClicked}>
              <AddOutlined />{' '}
            </Button>
          </StyledButtonContainer>
        </AddingTool>
      )}
    </StyledBlock>
  );
};
