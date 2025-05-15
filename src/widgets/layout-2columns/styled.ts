import styled from '@emotion/styled';

export const SyledLayout = styled.div<{ columnWidth: number }>`
  display: grid;
  grid-template-columns: ${(props) => props.columnWidth / 12}fr ${(props) =>
      1 - props.columnWidth / 12}fr;

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
