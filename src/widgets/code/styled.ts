import styled from '@emotion/styled';

export const StyledCode = styled.div<{ editMode?: boolean }>`
  min-height: 20px;
`;

export const CodeMask = styled.div<{ height: number }>`
  position: absolute;
  width: 100%;
  left: 0px;
  top: 0px;
  height: ${(props) => props.height}px;
  background: rgba(0, 0, 0, 0.02);
`;
