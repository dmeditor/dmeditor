import styled from '@emotion/styled';

export const IFrameMask = styled.div<{ height: number }>`
  position: absolute;
  width: 100%;
  left: 0px;
  top: 0px;
  height: ${(props) => props.height}px;
  background: rgba(0, 0, 0, 0.05);
`;
