import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import { dmeConfig } from '../../config';
import { Mode } from '../../enum';
import { AddingMessage, StyledAddWidgetButton } from '../../main/renderer/styled';
import { useEditorStore, type AddBlockParameters } from '../../main/store';
import type { DMEData } from '../../types/dmeditor';
import { canEditControl } from '../../utils/editControl';
import BlockContainer, { type PositionType } from '../block-container';
import { BlockRender } from '../block-render/BlockRender';

interface BlockListProps {
  blockData: DMEData.BlockList;
  path: Array<number>;
  allowedTypes?: string[] | string;
  isEmbed?: boolean;
  direction?: 'vertical' | 'horizontal';
  mode: 'edit' | 'view';
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
      {props.mode === Mode.Edit && props.blockData.length === 0 && (
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

// const BlockWithContainer: React.FC<BlockWithContainerProps> = (props) => {
//   const { mode, isHovering, onAddClick, addingHorizontal } = props;

//   if (mode === Mode.View) {
//     return <StyledBlock {...containerAdditionalProps}>{props.children}</StyledBlock>;
//   }

//   const blockContainerRef = useRef<HTMLDivElement>(null);
//   const addPosition = useMousePosition(blockContainerRef.current, addingHorizontal);
//   console.log('wing pos', addPosition, addingHorizontal)

//   const addButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     if (addPosition) {
//       onAddClick(addPosition);
//     }
//   };

//   return (
//     <StyledBlock
//       ref={blockContainerRef}
//       hovering={isHovering}
//       editMode={mode === Mode.Edit}
//       {...containerAdditionalProps}
//     >
//       {addPosition === 'before' && (
//         <AddingTool position="before" horizontal={addingHorizontal}>
//           <StyledButtonContainer>
//             <Button onClick={addButtonClicked} sx={{ backgroundColor: '#fffff' }}>
//               <AddOutlined />{' '}
//             </Button>
//           </StyledButtonContainer>
//         </AddingTool>
//       )}

//       {props.children}

//       {addPosition === 'after' && (
//         <AddingTool position="after" horizontal={addingHorizontal}>
//           <StyledButtonContainer>
//             <Button onClick={addButtonClicked}>
//               <AddOutlined />
//             </Button>
//           </StyledButtonContainer>
//         </AddingTool>
//       )}
//     </StyledBlock>
//   );
// };
