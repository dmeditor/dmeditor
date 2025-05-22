import styled from '@emotion/styled';

export const SyledLayout = styled.div<{ columnWidth: number }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(
      0,
      ${(props) => (12 - props.columnWidth) / props.columnWidth}fr
    );

  .dme-viewmode-mobile & {
    display: block;
  }

  /** make full height */
  & > div {
    display: flex;
  }
  & > div > div {
    flex: 1;
  }
`;
