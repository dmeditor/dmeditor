import styled from '@emotion/styled';

const StyledAnchor = styled.a<{ disabled?: boolean; textAlign?: string }>`
  display: block;
  width: fit-content;
  text-decoration: none;
  ${(props) => (props.disabled ? 'pointer-events: none;' : '')}

  ${(props) => (props.textAlign ? 'text-align: ' + props.textAlign + ';' : '')}

  &:disabled {
    pointer-events: none;
    background-color: #f2f2f2;
  }
`;

const StyledButton = styled.button<{ disabled?: boolean; textAlign?: string }>`
  display: block;
  text-decoration: none;
  pointer: cursor;

  ${(props) => (props.textAlign ? 'text-align: ' + props.textAlign + ';' : '')}

  &:disabled {
    pointer: not-allowed;
    background-color: #f2f2f2;
  }
`;
const getStyledButton = (type: 'link' | 'button') => {
  return type === 'button' ? StyledButton : StyledAnchor;
};

export { getStyledButton };
