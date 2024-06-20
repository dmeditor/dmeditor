import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const ColorPickerItem = styled.li<{ selected?: boolean; unset?: boolean }>`
  transition: all 0.3s ease;
  &:hover {
    ${(props) => !props.unset && !props.selected && 'transform: scale(1.25);border-color: #999999;'}
  }
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin-right: 8px;
  width: ${(props) => (props.selected ? '26px' : '20px')};
  height: ${(props) => (props.selected ? '26px' : '20px')};
  border-radius: 50%;
  cursor: pointer;
  border: ${(props) => (props.unset ? 'none' : '0.5px solid')};
  border-color: ${(props) => (props.selected ? '#999999' : '#cccccc')};
  box-sizing: border-box;
`;

export const colorList = css`
  display: flex;
  row-gap: 8px;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
  align-items: baseline;
`;
