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
  img {
    cursor: pointer;
    width: auto;
    height: 200px;
  }
`;

export const GalleryImage = css`
  width: auto;
  height: auto;
  max-height: 40rem;
`;

export const GalleryDialog = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const IconWrapper = styled.span`
  display: inline-block;
  margin: 0 4px;
  cursor: pointer;
`;
