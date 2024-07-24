import styled from '@emotion/styled';

//todo: use outline(but outline doesn't have radius) because border will make it not same as view.
export const StyledBlock = styled.div<{ active?: boolean; hovering?: boolean; editMode?: boolean }>`
  ${(props) => {
    if (props.hovering && props.editMode) {
      return `
        z-index: calc( var(--dmee-zindex) + 50 );
        outline: 2px dotted var(--dmee-selected-border-color);
        border-radius: 4px;`;
    }
  }}

  position: relative;
`;
