import styled from '@emotion/styled';

export const StyledGrid = styled.div<{ columns: number; gap: number }>`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  ${(props) => (props.gap ? 'grid-gap:' + props.gap + 'px;' : '')}
`;
