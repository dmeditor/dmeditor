import styled from '@emotion/styled';

export const Root = styled.div<{ uiConfig: { [props: string]: string } }>`
  --dmee-bg-color: ${(props) => props.uiConfig['bg-color'] || '#1d4b64'};
  --dmee-topbar-height: 40px;
  --dmee-bg-editarea: ${(props) => props.uiConfig['bg-editarea'] || '#646c71'};
`;

export const Layout = {
  Main: styled.div<{ config: { zIndex: number }; settingWidth: number; resizing?: boolean }>`
    ${(props) => (props.resizing ? 'user-select: none;' : '')}
    --dmee-layout-property-width: ${(props) => props.settingWidth}px;
    --dmee-edit-max-width: 1200px;

    --dmee-selected-border-color: #fc7e4b;
    --dmee-text-hover-color: #1d4b64;

    --dmee-hover-font-color: red;

    --dmee-bg-sidearea: #f3f4f6;

    --dmee-zindex: ${(props) => props.config.zIndex};
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 5px var(--dmee-layout-property-width);
    color: #333333;
    margin: 0px auto;
    background-color: var(--dmee-bg-editarea);
  `,
  Separator: styled.div<{ resizing?: boolean }>`
    border-left: 1px solid #000000;
    background: ${(props) => (props.resizing ? '#666666' : '#ffffff')};
    cursor: col-resize;
    transition: background-color 0.15s 0.15s ease-in-out;
    &:hover {
      border-left-color: #000000;
      background: #666666;
    }
  `,
  Edit: styled.div`
    margin-top: var(--dmee-topbar-height);
    overflow-y: auto;
    position: relative;
    padding-bottom: var(--dmee-bottom-height);
  `,
  EditModeBar: styled.div`
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 5px;
    top: calc(var(--dmee-topbar-height) + 5px);
    right: calc(var(--dmee-layout-property-width) + 25px);
  `,
  View: styled.div`
    background: var(--dmee-bg-editarea);
    margin-top: var(--dmee-topbar-height);
    height: calc(100vh - var(--dmee-topbar-height));
  `,
  SettingPanel: styled.div`
    margin-top: var(--dmee-topbar-height);
    background-color: var(--dmee-bg-sidearea);
    position: relative;
    overflow-y: auto;
  `,
};

export const ViewDevicesContainer = styled.div`
  text-align: center;
  padding: 5px 0px;
`;

export const View = {
  Container: styled.div<{ containerWidth: number; contentWidth: number }>`
    width: ${(props) => props.containerWidth}px;
    height: calc(100vh - 120px);
    overflow-y: auto;
    overflow-x: hidden;
    margin: auto;
    background: #ffffff;
    border: 1px solid #333333;

    & > div {
      --dme-container-width: ${(props) => props.containerWidth}px !important;
      --dme-main-width: ${(props) => props.contentWidth}px !important;
      max-width: var(--dme-main-width);
      margin: auto;
      min-height: 100%;
    }
  `,
  DeviceItem: styled.div<{ selected?: boolean }>`
    display: inline-block;
    border-radius: 4px;
    margin-left: 5px;
    &:hover {
      background: #494d4f;
    }
    background: ${(props) => (props.selected ? '#494d4f' : 'none')};
  `,
};

export const EmtpyBlock = styled.div`
  height: 1px;
  margin-top: -1px;
`;

export const EditContainer = styled.div<{ width?: string }>`
  min-height: 100%;
  margin: 0px auto;
  width: ${(props) => props.width || '90%'};
  max-width: var(--dmee-edit-max-width);
  background-color: white;
  border: 1px solid #cccccc;
`;

export const EditArea = styled.div<{ maxWidth?: string; hideEditBorder?: boolean }>`
  margin: auto;
  min-height: calc(100vh - var(--dmee-topbar-height));
  max-width: ${(props) => props.maxWidth || '90%'};
  ${(props) => (props.hideEditBorder ? {} : { border: '1px dashed #999999' })}
`;

export const SideTool = {
  Container: styled.div`
    position: fixed;
    bottom: 40vh;
    right: calc(var(--dmee-layout-property-width) + 20px);
  `,
  Item: styled.div`
    margin-top: 12px;
  `,
};

export const SettingContainer = styled.div``;
