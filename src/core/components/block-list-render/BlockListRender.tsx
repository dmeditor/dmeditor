import React, { useEffect, useRef, useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

import { dmeConfig } from '../../../core/config';
import { canEditControl } from '../../../core/utils/editControl';
import { useMousePosition } from '../../main/hooks/useMousePosition';
import {
  AddingMessage,
  AddingTool,
  BlockListStyle,
  StyledAddWidgetButton,
  StyledBlock,
  StyledButtonContainer,
} from '../../main/renderer/styled';
import { useEditorStore } from '../../main/store';
import type { DMEData } from '../../types/dmeditor';
import emitter from '../../utils/event';
import { BlockRender } from '../block-render/BlockRender';

interface BlockListProps {
  blockData: DMEData.BlockList;
  path: Array<number>;
  allowedTypes?: string[] | string;
  isEmbed?: boolean;
  direction?: 'vertical' | 'horizontal';
  mode: 'edit' | 'view';
}

interface BlockWithContainerProps {
  isHovering?: boolean;
  mode: 'edit' | 'view';
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
      executeAdding(
        props.path,
        index,
        position,
        props.allowedTypes[0],
        props.isEmbed ? true : false,
      );
    } else {
      setAddParameters({
        index: index,
        position: position,
      });

      startAddBlock(props.path, index, position, {
        types: props.allowedTypes,
        isEmbed: props.isEmbed,
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
        let blockMode = props.mode;
        if (
          blockMode == 'edit' &&
          dmeConfig.editor.enableEditControl &&
          canEditControl(blockData) === false &&
          blockData.editControl === 0
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
              isHovering={hoverPath?.join(',') === [...props.path, index].join(',')}
              addingHorizontal={props.direction === 'horizontal'}
              onAddClick={(position) => handleAdding(position, index)}
            >
              <BlockRender mode={blockMode} path={[...props.path, index]} data={blockData} />
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
  const { mode, isHovering, onAddClick, addingHorizontal } = props;

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
      hovering={isHovering}
      editMode={mode === 'edit'}
      {...containerAdditionalProps}
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
