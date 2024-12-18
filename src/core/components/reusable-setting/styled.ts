import styled from '@emotion/styled';

export const Row = styled.div`
  margin-top: 8px;
  display: flex;
`;

export const CellTitle = styled.div<{ width?: number }>`
  ${(props) => (props.width ? { width: props.width + 'px' } : { flex: 1 })};
  margin-right: 4px;
  padding: 8px;
  border: #ddd solid 1px;

  &:focus,
  &:hover {
    border: #999 solid 1px;
  }

  &:focus {
    background-color: white;
  }
`;

export const CellOperation = styled.div`
  width: 35%;
  text-align: right;
`;
