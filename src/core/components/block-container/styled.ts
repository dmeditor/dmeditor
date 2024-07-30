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

export const PositionRangeWrapper = styled.div<{
  range?: number;
  editMode?: boolean;
  showBefore?: boolean;
  showAfter?: boolean;
  horizontal?: boolean;
}>`
  // position: relative;

  ${({ editMode, range, showAfter, showBefore, horizontal }) =>
    editMode &&
    `
    z-index: calc(var(--dmee-zindex) + 50);

    &::before,
    &::after {
      content: '';
      position: absolute;
      // border: 1px dashed var(--dmee-selected-border-color);
      background-color: var(--dmee-selected-border-color);
      opacity: 0.3;
      pointer-events: none;
      box-sizing: border-box;
    }

    &::before {
      ${
        horizontal
          ? `
          top: 0;
          left: -${range}px;
          bottom: 0;
          width: ${range}px;
          display: ${showBefore ? 'block' : 'none'};
        `
          : `
          left: 0;
          top: 0;
          right: 0;
          height: ${range}px;
          display: ${showBefore ? 'block' : 'none'};
        `
      }
    }

    &::after {
      ${
        horizontal
          ? `
          top: 0;
          right: -${range}px;
          bottom: 0;
          width: ${range}px;
          display: ${showAfter ? 'block' : 'none'};
        `
          : `
          left: 0;
          bottom: 0;
          right: 0;
          height: ${range}px;
          display: ${showAfter ? 'block' : 'none'};
        `
      }
    }
  `}
`;
