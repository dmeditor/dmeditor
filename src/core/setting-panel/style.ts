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
  &:hover {
    background: white;
  }
`;

export const WidgetListContainer = styled.div``;

export const AdddBlockHeader = styled.div`
  /* position: absolute;
  right: 0px;
  top: 0px;
  width: 100%; */
`;

export const StyledSettingItem = {
  Container: styled.div<{ upDown?: boolean }>`
    display: ${(props) => (props.upDown ? 'block' : 'flex')};
    padding: 5px 0px;
    align-items: center;
  `,
  Label: styled.label<{ autoWidth?: boolean }>`
    min-width: 100px;
    color: #333333;
    font-size: 14px;
  `,
  Setting: styled.div<{ upDown?: boolean; autoWidth?: boolean }>`
    ${(props) => (props.upDown ? 'padding: 10px 5px;' : '')}
    ${(props) => (props.autoWidth ? '' : 'min-width: 180px;')}
    position: relative;
    flex: 1;
  `,
};

export const StyledSettingGroup = {
  Container: styled.fieldset<{ expandable?: boolean; open?: boolean }>`
    margin-top: 5px;
    padding: 5px 0px;
    ${(props) =>
      props.expandable && !props.open
        ? 'border: none;'
        : 'border: 1px solid #dddddd;background-color: rgba(255,255,255,0.5);'}
    border-radius: 4px;
  `,
  Header: styled.legend`
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 5px;
    &:hover {
      color: var(--dmee-text-hover-color);
    }
  `,
  Body: styled.div`
    padding: 0px 15px;
  `,
};

export const RightElement = styled.div`
  float: right;
`;

export const AlignRight = styled.div`
  text-align: right;
`;
