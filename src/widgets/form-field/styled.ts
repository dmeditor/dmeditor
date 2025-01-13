import styled from '@emotion/styled';

export const FormRow = styled.div<{ newLine?: boolean; labelWidth?: string | number }>`
  ${(props) =>
    props.newLine
      ? {}
      : {
          display: 'flex',
          alignItems: 'center',
          '& > label': {
            paddingRight: 10,
            width: props.labelWidth || 'initial',
          },
          '& > div': {
            flex: 1,
          },
        }}

  textarea {
    width: 100%;
  }

  .dme-w-required {
    color: red;
  }
`;
