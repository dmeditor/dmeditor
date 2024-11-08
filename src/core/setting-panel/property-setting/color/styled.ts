import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const ColorPickerItem = styled.li<{ selected?: boolean; unset?: boolean }>`
  transition: ${(props) => (props.selected ? '' : 'all  0.3s ease')};
  &:hover {
    ${(props) =>
      !props.unset &&
      (props.selected
        ? `border-width: 1px;transform: scale(1.1);background-size: 70%; background-repeat:no-repeat; background-position:center; background-image:  url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF0000"><path d="M20 6h-4V4.5A2.5 2.5 0 0 0 13.5 2h-3A2.5 2.5 0 0 0 8 4.5V6H4c-.55 0-1 .45-1 1s.45 1 1 1h.12l.73 11.66A2.49 2.49 0 0 0 7.35 22h9.3c1.32 0 2.41-1.03 2.5-2.34L19.88 8H20c.55 0 1-.45 1-1s-.45-1-1-1ZM10 4.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5V6h-4V4.5Zm7.15 15.03a.51.51 0 0 1-.5.47h-9.3a.51.51 0 0 1-.5-.47L6.13 8h11.74l-.72 11.53ZM10 10c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1ZM14 10c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-.55-.45-1-1-1Z"></path></svg>')`
        : 'transform: scale(1.25);border-color: #999999;')}
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
  align-items: center;
`;
