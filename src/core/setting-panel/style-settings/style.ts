import styled from '@emotion/styled';

export const InlineBlockStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
`;

export const InlineBlockItemStyle = styled.div<{ selected?: boolean }>`
  padding: 6px;
  border: 1px solid #f0f0f0;
  background-color: #efefef;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;

  &:hover {
    border-color: #dddddd;
  }
  ${(props) =>
    props.selected
      ? `
        background-color: #333333;
        color: #ffffff;
    `
      : ''};
`;

export const IconDiv = styled.div`
  display: inline-block;
  width: 1.5rem;
  text-align: center;
  margin-right: 6px;
`;

export const IconImg = styled.img`
  max-width: 100%;
  max-height: 1.4rem;
  vertical-align: middle;
`;
