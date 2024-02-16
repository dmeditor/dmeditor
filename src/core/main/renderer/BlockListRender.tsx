import React, { useEffect, useRef, useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

import { useMousePosition } from '../hooks/useMousePosition';
import { AddBlockParameters, useEditorStore } from '../store';
import { BlockRender } from './BlockRender';
import { AddingMessage, AddingTool, BlockListStyle, StyledAddWidgetButton, StyledBlock } from './styled';
import emitter from 'Core/utils/event';
import { DMEData } from 'Src/core/types';

interface BlockListProps {
  blockData: DMEData.BlockList;
  path: Array<number>;
  allowedTypes?: string[];
  isInternal?: boolean;
  direction?:'vertical'|'horizontal';
}

interface BlockWithAddingProps {
  isActive?: boolean;
  onSelect: () => void;
  onAddClick: (position: 'before' | 'after') => void;
  children: any;
  addingHorizontal?:boolean;
}

export const BlockListRender = (props: BlockListProps) => {
  const {
    selected: { blockIndex: selectedBlockIndex, currentListPath },
    addBlockData,
    startAddBlock,
    clearAdding,
    updateSelectedBlockIndex,
  } = useEditorStore();

  const {status:globalAddingStatus} = addBlockData||{};
  const isInSelectedContext = currentListPath.join(',') === props.path.join(',');

  console.log(currentListPath);
  console.log(isInSelectedContext);

  const [addParameters, setAddParameters] = useState<AddBlockParameters>();

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

  //register event
  useEffect(() => {
    emitter.addListener('addBlock', (parameters: AddBlockParameters) => {
      startAddBlock(parameters.context, parameters.index, parameters.position);   
    });

    return () => {
      emitter.removeListener('addBlock');
    };
  }, []);

  //trigger adding event
  useEffect(() => {
    if (addParameters?.status === 'started') {
      emitter.emit('addBlock', addParameters);
    }
  }, [addParameters===undefined, addParameters?.index, addParameters?.position]); //todo: better way to check?

  //trigger state change when it's done.
  useEffect(()=>{
    if(addParameters?.status==='started'){
      //done
      if( globalAddingStatus==='done'){
        setAddParameters(undefined);
        clearAdding();
      }
      if(globalAddingStatus === 'cancelled'){
          //todo: deleted empty list
          setAddParameters(undefined);
          clearAdding();
      }
    }
  }, [globalAddingStatus])

  const handleAdding = (position: 'before' | 'after', index: number) => {
    setAddParameters({
      index: index,
      position: position,
      status: 'started',
      context: props.path,
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
            { addParameters?.status === 'started' &&
              isInSelectedContext &&
              addParameters.index === index &&
              addParameters.position === 'before' &&
              renderAddingMessage()}
            <BlockWithAdding
              isActive={isActive}
              addingHorizontal = {props.direction==='horizontal'}
              onSelect={() => select(index)}
              onAddClick={(position) => handleAdding(position, index)}
            >
              <BlockRender active={isActive} path={[...props.path, index]} data={blockData} />
            </BlockWithAdding>

            {addParameters?.status === 'started' &&
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
  const { isActive, onSelect, onAddClick, addingHorizontal } = props;

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
      {...containerAdditionalProps}
      onClick={(e) => onSelect()}
    >
      {addPosition === 'before' && (
        <AddingTool position="before" horizontal={addingHorizontal}>
          <Button onClick={addButtonClicked}>
            <AddOutlined />{' '}
          </Button>
        </AddingTool>
      )}
      {props.children}
      {addPosition === 'after' && (
        <AddingTool position="after" horizontal={addingHorizontal}>
          <Button onClick={addButtonClicked}>
            <AddOutlined />{' '}
          </Button>
        </AddingTool>
      )}
    </StyledBlock>
  );
};
