import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const StyleTabBody = styled.div`
  padding: 10px 5px;
`;

export const StyleWidgetList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
`;

export const StyleWidgetItem = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
  }
`;

export const StyleWidgetItemText = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 5px;
`;

export const StyleWidgetStyleList = styled.div`
  display: grid;
  padding: 8px;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  grid-gap: 8px;
`;

export const StyleWidgetStyleItem = styled.div`
  padding: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
