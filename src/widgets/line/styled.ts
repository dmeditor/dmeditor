import styled from '@emotion/styled';

export const StyledSpace = styled.div<{ spaceHeight: number; spaceColor?: string }>`
  height: ${(props) => props.spaceHeight}px;
  ${(props) => props.spaceColor && 'background:' + props.spaceColor + ';'}
`;
