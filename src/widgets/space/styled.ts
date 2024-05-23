import styled from '@emotion/styled';

export const StyledSpace = styled.div<{ spaceHeight: number }>`
  height: ${(props) => props.spaceHeight}px;
`;
