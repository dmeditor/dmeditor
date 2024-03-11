import styled from '@emotion/styled';

const StyledAnchor = styled.a`
  display: inline-block;
  text-decoration: none;
  pointer-events: none;

  &:disabled {
    pointer-events: none;
    background-color: #f2f2f2;
  }
`;

const StyledButton = styled.button`
  display: inline-block;
  text-decoration: none;
  pointer: cursor;

  &:disabled {
    pointer: not-allowed;
    background-color: #f2f2f2;
  }
`;
const getStyledButton = (type: 'link' | 'button') => {
  return type === 'button' ? StyledButton : StyledAnchor;
};

export { getStyledButton };
