import styled from '@emotion/styled';

export const StyledBlock = styled.div<{ active?: boolean }>`
  outline: ${(props) => (props.active ? '1px solid var(--dme-selected-border-color)' : 'none')};
`;

export const AddingMessage = styled.div`
  color: #666666;
  padding: 10;
  background: #fcfcfc;
  border: 1px solid #eeeeee;
  margin: 0px 30px;
  border-radius: 10px;
`;
