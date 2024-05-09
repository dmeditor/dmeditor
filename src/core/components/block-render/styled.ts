import styled from '@emotion/styled';

export const BlockWrapper = styled.div`
  &:hover {
    outline: 2px dotted var(--dmee-selected-border-color);
    border-radius: 4px;
    z-index: calc(var(--dmee-zindex) + 50);
  }
`;
