import styled from '@emotion/styled';

export const SyledLayout = styled.div<{ column1Width: number; column2Width: number }>`
  display: grid;
  grid-template-columns: ${(props) => (props.column1Width / 12) * 100}% ${(props) =>
      (props.column2Width / 12) * 100}% ${(props) =>
      (1 - props.column1Width / 12 - props.column2Width / 12) * 100}%;
`;
