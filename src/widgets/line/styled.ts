import styled from '@emotion/styled';

export const StyledLine = styled.div<{
  spaceHeight: number;
  spaceColor?: string;
  vertical?: boolean;
}>`
  ${(props) => props.spaceColor && 'background:' + props.spaceColor + ';'}
  ${(props) =>
    props.vertical
      ? `
    width: ${props.spaceHeight}px;
    height: 100%;
    min-height: 5px;
  `
      : `
    height: ${props.spaceHeight}px;
  `}
`;
