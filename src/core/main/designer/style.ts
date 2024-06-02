import styled from '@emotion/styled';

export const Root = styled.div<{ uiConfig: { [props: string]: string } }>`
  --dmee-bg-color: ${(props) => props.uiConfig['bg-color'] || '#1d4b64'};
  --dmee-topbar-height: 40px;
  --dmee-bg-editarea: ${(props) => props.uiConfig['bg-editarea'] || '#666666'};
`;

export const Layout = {
  Main: styled.div<{ config: { zIndex: number }; settingWidth: number }>`
    --dmee-layout-property-width: ${(props) => props.settingWidth}px;
    --dmee-edit-max-width: 1200px;

    --dmee-selected-border-color: #fc7e4b;
    --dmee-hover-font-color: red;

    --dmee-zindex: ${(props) => props.config.zIndex};
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 5px var(--dmee-layout-property-width);
    color: #333333;
    margin: 0px auto;
    background-color: var(--dmee-bg-editarea);
  `,
  Separator: styled.div`
    background-color: #d1d5db;
    cursor: col-resize;
  `,
  Edit: styled.div`
    border-right: 1px solid #cccccc;
    margin-top: var(--dmee-topbar-height);
    overflow-y: auto;
  `,
  View: styled.div`
    background: var(--dmee-bg-editarea);
    margin-top: var(--dmee-topbar-height);
    height: calc(100vh - var(--dmee-topbar-height));
  `,
  SettingPanel: styled.div`
    margin-top: var(--dmee-topbar-height);
    background-color: white;
    position: relative;
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

export const EditContainer = styled.div`
  min-height: 100%;
  margin: 0px auto;
  width: 90%;
  max-width: var(--dmee-edit-max-width);
  background-color: white;
  border: 1px solid #cccccc;
`;

export const EditArea = styled.div`
  margin: auto;
  min-height: calc(100vh - var(--dmee-topbar-height));
  max-width: 90%;
  border: 1px dashed #999999;
`;

export const SettingContainer = styled.div``;
