import styled from '@emotion/styled';

export const Root = styled.div<{ uiConfig: { [props: string]: string } }>`
  --dmee-bg-color: ${(props) => props.uiConfig['bg-color'] || '#1d4b64'};
  --dmee-topbar-height: 40px;
  --dmee-bg-editarea: ${(props) => props.uiConfig['bg-editarea'] || '#f3f3f3'};
`;

export const Layout = {
  Main: styled.div<{ config: { zIndex: number } }>`
    --dmee-layout-property-width: 350px;
    --dmee-edit-max-width: 1200px;

    --dmee-selected-border-color: #fc7e4b;
    --dmee-hover-font-color: red;

    --dmee-zindex: ${(props) => props.config.zIndex};
    height: 100vh;
    display: grid;
    grid-template-columns: calc(100% - var(--dmee-layout-property-width)) var(
        --dmee-layout-property-width
      );
    color: #333333;
    margin: 0px auto;
    background-color: var(--dmee-bg-editarea);
  `,
  Edit: styled.div`
    border-right: 1px solid #cccccc;
    margin-top: var(--dmee-topbar-height);
  `,
  View: styled.div`
    background: #666666;
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
  Container: styled.div<{ device: string }>`
    ${(props) => {
      switch (props.device) {
        case 'pc':
          return '--dme-container-width: 1200px;--dme-main-width: 1000px;';
        case 'tablet':
          return '--dme-container-width:810px; --dme-main-width: 810px;';
        case 'mobile':
          return '--dme-container-width:400px;--dme-main-width: 400px;';
      }
    }};
    width: var(--dme-container-width);
    height: calc(100vh - 120px);
    overflow-y: auto;
    margin: auto;
    background: #cccccc;

    & > div {
      max-width: var(--dme-main-width);
      margin: auto;
      height: 100%;
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
