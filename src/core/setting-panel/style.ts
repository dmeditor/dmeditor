import styled from '@emotion/styled';

export const SettingHeader = styled.div`
  font-weight: bold;
  margin: 10px 0px;
`;

export const SettingDescription = styled.div`
  color: #999999;
  padding: 10px 0px 0px 10px;
  font-size: 90%;
  font-style: italic;
`;

export const PageTitle = styled.div`
  padding: 5px;
  font-size: 18px;
  white-space: nowrap;
  overflow-x: hidden;
  &:hover {
    outline: 1px dashed #333333;
  }
`;

export const SettingItem = styled.div`
  margin-top: 15px;
`;

export const Space = styled.div`
  height: 10px;
`;

export const PathItem = styled.span<{ canClick?: boolean; selected?: boolean }>`
  font-size: 90%;
  cursor: pointer;
  display: inline-block;
  vertical-align: bottom;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  color: ${(props) => (props.canClick ? '#0c0c0c' : '#666666')};

  ${(props) =>
    props.canClick
      ? `
    &:hover{
        color: var(--dmee-hover-font-color);
    }
    `
      : ''};
`;

export const PathContainer = styled.div`
  padding: 0px 10px;
`;

export const AddBlockContainer = styled.div`
  height: calc(100vh - var(--dmee-topbar-height));
  overflow-y: auto;
  padding: 5px;
`;

export const StyledProperty = styled.div`
  padding: 10px;
`;

export const Required = styled.span`
  font-size: 0.9rem;
  color: red;
`;

export const ClickEditInput = styled.input`
  width: 100%;
  font-size: 18px;
  border: 0px;
  background: var(--dmee-bg-sidearea);
`;

export const WidgetListContainer = styled.div``;

export const AdddBlockHeader = styled.div`
  /* position: absolute;
  right: 0px;
  top: 0px;
  width: 100%; */
`;

export const StyledSettingItem = {
  Container: styled.div<{ upDown?: boolean; autoWidth?: boolean }>`
    display: ${(props) => (props.upDown ? 'block' : 'flex')};
    padding: 4px 0px;
    align-items: center;
  `,
  Label: styled.label`
    min-width: 120px;
    color: #333333;
    font-size: 14px;
  `,
  Setting: styled.div<{ upDown?: boolean }>`
    ${(props) => (props.upDown ? 'padding: 10px 5px;' : '')}
    min-width: 180px;
    position: relative;
  `,
};

export const StyledSettingGroup = {
  Container: styled.fieldset<{ expandable?: boolean; open?: boolean }>`
    margin-top: 15px;
    ${(props) => (props.expandable && !props.open ? 'border: none;' : 'border: 1px solid #dddddd;')}
    padding: 5px 10px;
    border-radius: 4px;
  `,
  Header: styled.legend`
    cursor: pointer;
    padding-left: 5px;
    padding-right: 5px;
  `,
  Body: styled.div``,
};

export const RightElement = styled.div`
  float: right;
`;

export const AlignRight = styled.div`
  text-align: right;
`;
