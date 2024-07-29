import styled from '@emotion/styled';

export const BlockContainerWrapper = styled.div<{
  active?: boolean;
  hovering?: boolean;
  editMode?: boolean;
}>`
  position: relative;

  ${({ hovering, editMode }) =>
    hovering &&
    editMode &&
    `
    z-index: calc(var(--dmee-zindex) + 50);

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -1px;
      right: -1px;
      bottom: 0;
      border: 2px dotted var(--dmee-selected-border-color);
      border-radius: 8px;
      pointer-events: none; 
      z-index: 1;
    }
  `}
`;
