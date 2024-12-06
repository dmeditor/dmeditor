import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import { dmeConfig } from '../../config';
import { Mode } from '../../constants';
import { AddingMessage, StyledAddWidgetButton } from '../../main/renderer/styled';
import { useEditorStore, type AddBlockParameters } from '../../main/store';
import type { DME, DMEData } from '../../types/dmeditor';
import { canEditControl } from '../../utils/editControl';
import BlockContainer, { type PositionType } from '../block-container';
import { BlockRender } from '../block-render/BlockRender';

interface BlockListProps {
  blockData: DMEData.BlockList;
  path: Array<number | string>;
  allowedTypes?: string[] | string;
  isEmbed?: boolean;
  direction?: 'vertical' | 'horizontal';
  mode: DME.Mode;
}

export const BlockListRender: React.FC<BlockListProps> = (props) => {
  const {
    selected: { blockIndex: selectedBlockIndex, currentListPath },
    addBlockData,
    addBlock,
    startAddBlock,
    clearAdding,
    hoverPath,
    executeAdding,
  } = useEditorStore();
  const { direction } = props;

  const { status: globalAddingStatus } = addBlockData || {};
  const isInSelectedContext = currentListPath.join(',') === props.path.join(',');

  const [addParameters, setAddParameters] = useState<{
    position: AddBlockParameters['position'];
    index: number;
  }>();

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

  const handleAdding = (position: Exclude<PositionType, ''>, index: number) => {
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

  const renderAddingMessage = <AddingMessage>Please choose widget.</AddingMessage>;

  const isHovering = (index: number) => {
    return isInSelectedContext && hoverPath?.join(',') === [...props.path, index].join(',');
  };

  return (
    <>
      {props.mode === Mode.edit && props.blockData.length === 0 && (
        <StyledAddWidgetButton>
          <Button onClick={(e) => handleAdding('after', 0)}>Add widget</Button>
        </StyledAddWidgetButton>
      )}
      {props.blockData.map((blockData: DMEData.Block, index: number) => {
        let blockMode = props.mode;
        if (
          blockMode === Mode.view &&
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
              renderAddingMessage}

            <BlockContainer
              mode={blockMode}
              isHovering={isHovering(index)}
              addingHorizontal={direction === 'horizontal'}
              onAddClick={(position) => {
                if (!position) return;
                handleAdding(position, index);
              }}
            >
              <BlockRender mode={blockMode} path={[...props.path, index]} data={blockData} />
            </BlockContainer>

            {addParameters &&
              isInSelectedContext &&
              addParameters.index === index &&
              addParameters.position === 'after' &&
              renderAddingMessage}
          </React.Fragment>
        );
      })}
    </>
  );
};
