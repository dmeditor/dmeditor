import styled from '@emotion/styled';

export const SyledLayout = styled.div<{ columnWidth: number }>`
  display: grid;
  grid-template-columns: ${(props) => (props.columnWidth / 12) * 100}% ${(props) =>
      (1 - props.columnWidth / 12) * 100}%;

  .dme-viewmode-mobile & {
    display: block;
  }
`;
