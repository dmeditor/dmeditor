import React, { useRef } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

import { Mode } from '../../../core/enum';
import { useMousePosition } from '../../main/hooks/useMousePosition';
import { AddingTool, StyledButtonContainer } from '../../main/renderer/styled';
import { BlockContainerWrapper } from './styled';

export type PositionType = '' | 'before' | 'after';

interface BlockContainerProps {
  mode: 'view' | 'edit';
  isHovering: boolean;
  onAddClick: (position: PositionType) => void;
  addingHorizontal?: boolean;
  children: React.ReactNode;
}

const BlockContainer: React.FC<BlockContainerProps> = (props) => {
  const { mode, isHovering, onAddClick, addingHorizontal = false, children } = props;

  const blockContainerRef = useRef<HTMLDivElement>(null);
  const addPosition = useMousePosition(blockContainerRef.current, addingHorizontal);
  const containerAdditionalProps = { className: 'dme-block-container' };

  const addButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (addPosition) {
      onAddClick(addPosition);
    }
  };

  if (mode === Mode.View) {
    return (
      <BlockContainerWrapper hovering={isHovering} editMode={false} {...containerAdditionalProps}>
        {children}
      </BlockContainerWrapper>
    );
  }

  return (
    <BlockContainerWrapper
      ref={blockContainerRef}
      hovering={isHovering}
      editMode={mode === Mode.Edit}
      {...containerAdditionalProps}
    >
      {addPosition === 'before' && (
        <AddingTool position={addPosition} horizontal={addingHorizontal}>
          <StyledButtonContainer>
            <Button onClick={addButtonClicked}>
              <AddOutlined />
            </Button>
          </StyledButtonContainer>
        </AddingTool>
      )}

      {children}

      {addPosition === 'after' && (
        <AddingTool position="after" horizontal={addingHorizontal}>
          <StyledButtonContainer>
            <Button onClick={addButtonClicked}>
              <AddOutlined />
            </Button>
          </StyledButtonContainer>
        </AddingTool>
      )}
    </BlockContainerWrapper>
  );
};

export default BlockContainer;
