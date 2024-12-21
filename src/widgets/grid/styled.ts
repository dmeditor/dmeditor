import styled from '@emotion/styled';

export const StyledGrid = styled.div<{
  columns: number;
  gap: number;
  itemPosition?: 'top' | 'middle' | 'bottom';
}>`
  display: grid;
  align-items: ${(props) =>
    props.itemPosition
      ? { top: 'start', middle: 'center', bottom: 'end' }[props.itemPosition]
      : 'center'};
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  ${(props) => (props.gap ? 'grid-gap:' + props.gap + 'px;' : '')}
`;
