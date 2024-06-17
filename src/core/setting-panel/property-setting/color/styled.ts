import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const ColorItem = styled.li<{ selected?: boolean }>`
  position: relative;
  display: inline-block;
  margin: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #fff;

  &::before {
    content: ' ';
    display: ${(props) => (props.selected ? 'inline-block' : 'none')};
    width: 50%;
    height: 20%;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: translate(-50%, -60%) rotate(-45deg);
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

export const ColorPickerItem = styled.li<{ selected?: boolean; transparent?: boolean }>`
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin: 5px;
  width: ${(props) => (props.selected ? '24px' : '20px')};
  height: ${(props) => (props.selected ? '24px' : '20px')};
  border-radius: 50%;
  cursor: pointer;
  border: ${(props) => (props.transparent ? '2px solid' : 'none')};
  border-color: ${(props) => (props.transparent ? 'gray' : '#fff')};
  transform: ${(props) => (props.transparent ? 'rotate(135deg)' : 'unset')};
  box-sizing: border-box;

  &::before {
    content: ' ';
    display: ${(props) => (props.transparent ? 'inline-block' : 'none')};
    width: 100%;
    height: 50%;
    background: gray;
  }
`;

export const colorFullRing = css`
  margin-left: 20px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: conic-gradient(#f00, #f90, #ff0, #0f0, #0ff, #00f, #90f, #f00);
  mask: radial-gradient(circle, transparent 40%, white 41%);
  -webkit-mask: radial-gradient(circle, transparent 40%, white 41%);
  cursor: pointer;
`;

export const colorList = css`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
  align-items: center;
`;

export const ColorPickerWrapper = styled.div`
  position: relative;
  padding: 16px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const colorPickerTitle = css`
  display: flex;
  align-items: center;
  padding: 5px;
`;

export const Divider = styled.div`
  border-left: 1px solid #ccc;
  height: 20px;
  margin: 0 10px;
`;

export const ColorModeText = styled.span<{ active: boolean }>`
  color: ${(props) => (props.active ? '#000' : '#ccc')};
  cursor: pointer;
`;
