import styled from '@emotion/styled';

export const TabBodyContainer = styled.div<{ fullHeight?: boolean }>`
  padding: 0 10px;
  height: calc(100vh - ${(props) => (props.fullHeight ? 200 : 250)}px);
  overflow: auto;
`;

export const ActionPanel = styled.div`
  border-top: 1px solid #cccccc;
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 100%;
  padding: 20px 0px;
`;

export const ActionPanelButtonGroup = styled.span`
  padding: 0px 5px;
`;

export const StyledSettingNoGroup = styled.div`
  padding: 5px 10px;
`;

export const StyledSettingList = {
  Group: styled.div<{ level: number }>`
    padding: 0px ${(props) => props.level * 5}px;
  `,
  Children: styled.div<{ level: number }>`
    padding: 0px ${(props) => props.level * 10}px;
  `,
};
