import styled from '@emotion/styled';

export const FormRow = styled.div<{ newLine?: boolean }>`
  ${(props) => (props.newLine ? {} : { display: 'flex', alignItems: 'center' })}
  & >label {
    padding-right: 10px;
  }

  .dme-w-required {
    color: red;
  }
`;
