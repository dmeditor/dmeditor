import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const StyleTabBody = styled.div`
  padding: 10px 5px;
`;

export const StyleWidgetList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
`;

export const StyleWidgetItem = styled.div<{ active?: boolean }>`
  padding: 5px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-left: 2px solid transparent;
  background-color: ${(props) => (props.active ? '#ffffff' : 'transparent')};
  &:hover {
    color: #000000;
    background-color: #ffffff;
    border-left: 2px solid #cccccc;
  }
`;

export const StyleWidgetItemText = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 5px;
`;

export const StyleWidgetStyleList = styled.div<{ row: number }>((props) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(100px, 1fr))',
  gridRow: `${props.row + 2}`,
  gridColumn: '1 / -1',
  backgroundColor: '#ffffff',
  padding: '20px 10px',
  gap: 10,
  marginBottom: 10,
}));

export const StyleWidgetStyleItem = {
  Main: styled.div`
    background: #ffffff;
    border: 1px solid #eeeeee;
    color: #000000;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: #ffffff;
      border: 1px solid #cccccc;
    }
  `,
  Image: styled.div`
    padding-bottom: 10px;
    & > img {
      max-height: 30px;
    }
  `,
  Name: styled.div`
    font-size: 0.95rem;
    padding: 5px 0px;
  `,
};
