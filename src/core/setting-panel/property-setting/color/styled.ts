import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const ColorPickerItem = styled.li<{ selected?: boolean; unset?: boolean }>`
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin: 5px;
  width: ${(props) => (props.selected ? '24px' : '20px')};
  height: ${(props) => (props.selected ? '24px' : '20px')};
  border-radius: 50%;
  cursor: pointer;
  border: ${(props) => (props.unset ? '2px solid' : 'none')};
  border-color: ${(props) => (props.unset ? 'gray' : '#fff')};
  transform: ${(props) => (props.unset ? 'rotate(135deg)' : 'unset')};
  box-sizing: border-box;

  &::before {
    content: ' ';
    display: ${(props) => (props.unset ? 'inline-block' : 'none')};
    width: 100%;
    height: 50%;
    background: gray;
  }
`;

export const colorList = css`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
  align-items: center;
`;
