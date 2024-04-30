import React, { useEffect, useRef, useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { dmeConfig } from 'dmeditor/core/config';
import { canEditControl } from 'dmeditor/core/utils/editControl';

import { useMousePosition } from '../../main/hooks/useMousePosition';
import {
  AddingMessage,
  AddingTool,
  BlockListStyle,
  StyledAddWidgetButton,
  StyledBlock,
  StyledButtonContainer,
} from '../../main/renderer/styled';
import { AddBlockParameters, AddBlockPosition, useEditorStore } from '../../main/store';
import type { DMEData } from '../../types/dmeditor';
import emitter from '../../utils/event';
import { BlockRender } from '../block-render/BlockRender';

interface BlockListProps {
  blockData: DMEData.BlockList;
  path: Array<number>;
  allowedTypes?: string[] | string;
  isInternal?: boolean;
  direction?: 'vertical' | 'horizontal';
  mode: 'edit' | 'view';
}

interface BlockWithContainerProps {
  isActive?: boolean;
  isHovering?: boolean;
  mode: 'edit' | 'view';
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
    executeAdding,
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
    if (props.allowedTypes?.length === 1) {
      executeAdding(props.path, index, position, props.allowedTypes[0]);
    } else {
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
    }
  };

  const renderAddingMessage = () => {
    return <AddingMessage>Please choose widget.</AddingMessage>;
  };

  return (
    <>
      {props.mode === 'edit' && props.blockData.length === 0 && (
        <StyledAddWidgetButton>
          <Button onClick={(e) => handleAdding('after', 0)}>Add widget</Button>
        </StyledAddWidgetButton>
      )}
      {props.blockData.map((blockData: DMEData.Block, index: number) => {
        const isActive = isInSelectedContext && index === selectedBlockIndex;
        let blockMode = props.mode;
        if (
          blockMode == 'edit' &&
          blockData.editControl === 0 &&
          canEditControl(blockData) === false
        ) {
          blockMode = 'view';
        }
        return (
          <React.Fragment key={blockData.id}>
            {addParameters &&
              isInSelectedContext &&
              addParameters.index === index &&
              addParameters.position === 'before' &&
              renderAddingMessage()}
            <BlockWithContainer
              mode={blockMode}
              isActive={isActive}
              isHovering={hoverPath?.join(',') === [...props.path, index].join(',')}
              addingHorizontal={props.direction === 'horizontal'}
              onSelect={() => select(index)}
              onAddClick={(position) => handleAdding(position, index)}
            >
              <BlockRender
                mode={blockMode}
                active={isActive}
                path={[...props.path, index]}
                data={blockData}
              />
            </BlockWithContainer>

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

const BlockWithContainer = (props: BlockWithContainerProps) => {
  const { isActive, mode, isHovering, onSelect, onAddClick, addingHorizontal } = props;

  if (mode === 'view') {
    return <StyledBlock {...containerAdditionalProps}>{props.children}</StyledBlock>;
  }

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
