import styled from '@emotion/styled';

export const SyledLayout = styled.div<{ column1Width: number; column2Width: number }>`
  display: grid;
  width: 100%;
  grid-template-columns:
    minmax(0, ${(props) => props.column1Width / 12}fr) minmax(
      0,
      ${(props) => props.column2Width / 12}fr
    )
    minmax(0, ${(props) => (12 - props.column2Width - props.column1Width) / 12}fr);

  /** make full height */
  & > div {
    display: flex;
  }

  .dme-viewmode-mobile & {
    display: block;
  }

  & > div > div {
    flex: 1;
  }
`;
