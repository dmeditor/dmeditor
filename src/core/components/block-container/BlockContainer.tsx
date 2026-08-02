import React, { useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

import { Mode } from '../../constants';
import { useMousePosition } from '../../main/hooks/useMousePosition';
import { AddingTool, StyledButtonContainer } from '../../main/renderer/styled';
import type { DME } from '../../types/dmeditor';
import { BlockContainerWrapper, PositionRangeWrapper } from './styled';

export type PositionType = '' | 'before' | 'after';

interface BlockContainerProps {
  mode: DME.Mode;
  isHovering: boolean;
  addingHorizontal?: boolean;
  children: React.ReactNode;
  onAddClick: (position: PositionType) => void;
}

const BlockContainer: React.FC<BlockContainerProps> = (props) => {
  const { mode, isHovering, onAddClick, addingHorizontal = false, children } = props;

  // State ref so useMousePosition re-binds when the element mounts
  const [blockContainerEl, setBlockContainerEl] = useState<HTMLDivElement | null>(null);
  const showPositionRange = 30; // unit px

  const addPosition = useMousePosition(blockContainerEl, addingHorizontal, showPositionRange);

  const addButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (addPosition) {
      onAddClick(addPosition);
    }
  };

  if (mode === Mode.view) {
    return (
      <BlockContainerWrapper hovering={isHovering} editMode={false} className="dme-block-container">
        {children}
      </BlockContainerWrapper>
    );
  }

  return (
    <BlockContainerWrapper
      ref={setBlockContainerEl}
      hovering={isHovering}
      editMode={mode === Mode.edit}
      className="dme-block-container"
    >
      <PositionRangeWrapper
        range={showPositionRange}
        editMode={mode === Mode.edit}
        showBefore={addPosition === 'before'}
        showAfter={addPosition === 'after'}
        horizontal={addingHorizontal}
      >
        {addPosition && (
          <AddingTool
            className="dme-adding-tool"
            position={addPosition}
            horizontal={addingHorizontal}
          >
            <StyledButtonContainer>
              <Button onClick={addButtonClicked}>
                <AddOutlined />
              </Button>
            </StyledButtonContainer>
          </AddingTool>
        )}

        {children}
      </PositionRangeWrapper>
    </BlockContainerWrapper>
  );
};

export default BlockContainer;
