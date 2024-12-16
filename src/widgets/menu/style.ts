import styled from '@emotion/styled';

export const MenuContainer = styled.ul<{ color?: string }>`
  list-style: none;
  margin: 0px;
  padding: 0px;
  a,
  a:hover {
    ${(props) => (props.color ? { color: props.color } : {})}
  }
`;

export const MenuItem = styled.li``;
