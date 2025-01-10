import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const GalleryContainer = styled.div`
  display: flex;
`;

export const GalleryList = styled.div((props: { columns: number; gap: number }) => {
  return {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    gap: `${props.gap}px`,
    listStyle: 'none',
  };
});

export const GalleryItem = styled.div`
  position: relative;
  img {
    cursor: pointer;
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
`;

export const Caption = styled.div`
  position: absolute;
  bottom: 0px;
  padding: 5px;
  color: white;
  text-shadow: 1px 1px 1px #333333;
`;

export const GalleryImage = css`
  width: auto;
  height: auto;
  max-height: 40rem;
`;

export const GalleryDialog = styled.div`
  height: 100%;
  width: 100%;
`;

export const IconWrapper = styled.div<{ isRight?: boolean }>`
  cursor: pointer;
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0px;
  display: flex;
  align-items: center;
  ${(props) =>
    props.isRight
      ? 'flex-direction:row-reverse;right: 0px; padding-right: 20px; }}'
      : 'left:0px;padding-left: 20px'};
`;

export const VerticalMiddle = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

export const ImageIndicator = styled.div`
  text-align: center;
  position: absolute;
  bottom: 5px;
  text-align: center;
  width: 100%;
  font-size: 16px;
  color: white;
  text-shadow: 1px 1px 1px #333333;
  text-align: center;
`;

export const PaginationContainer = styled.div`
  text-align: right;
`;
