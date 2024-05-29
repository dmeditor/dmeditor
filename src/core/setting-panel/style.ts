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

export const RightElement = styled.div`
  float: right;
`;

export const TabBodyContainer = styled.div<{ fullHeight?: boolean }>`
  padding: 0px 15px 150px 15px;
  height: calc(100vh - ${(props) => (props.fullHeight ? 200 : 350)}px);
  overflow: auto;
`;

export const ActionPanel = styled.div`
  border-top: 1px solid #cccccc;
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 100%;
  padding: 20px 0px;
  background-color: white;
`;

export const ActionPanelButtonGroup = styled.span`
  padding: 0px 5px;
`;

export const PathContainer = styled.div`
  padding: 0px 10px;
`;

export const AddBlockContainer = styled.div`
  height: calc(100vh - var(--dmee-topbar-height));
  overflow-y: scroll;
  padding: 10px;
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
  border: 0px;
`;

export const WidgetListContainer = styled.div``;

export const AdddBlockHeader = styled.div`
  /* position: absolute;
  right: 0px;
  top: 0px;
  width: 100%; */
  background-color: white;
  z-index: 10;
`;

export const StyledSettingList = {
  Group: styled.div<{ level: number }>`
    padding: 0px ${(props) => props.level * 5}px;
  `,
  Children: styled.div<{ level: number }>`
    padding: 0px ${(props) => props.level * 10}px;
  `,
};

export const StyledSettingItem = {
  Container: styled.div<{ autoWidth?: boolean }>`
    margin-top: 8px;
    display: flex;
    align-items: center;
  `,
  Label: styled.label`
    min-width: 120px;
    color: #333333;
    font-size: 14px;
  `,
  Setting: styled.div`
    min-width: 200px;
  `,
};
