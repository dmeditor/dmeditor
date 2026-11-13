import styled from '@emotion/styled';

export const FileControl = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;
  cursor: pointer;
  max-width: 100%;

  input[type='file'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .dme-w-input-file-button {
    display: inline-block;
    padding: 4px 12px;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    background: #f6f6f6;
    line-height: 1.4;
    flex: none;
  }

  &:focus-within .dme-w-input-file-button {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  .dme-w-input-file-text {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

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
