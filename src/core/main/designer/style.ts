import styled from '@emotion/styled';
import { dmeConfig } from 'dmeditor/config';

export const Root = styled.div<{ uiConfig: { [props: string]: string } }>`
  --dmee-bg-color: ${(props) => props.uiConfig['bg-color'] || '#1d4b64'};
  --dmee-topbar-height: 40px;
  --dmee-bg-editarea: ${(props) => props.uiConfig['bg-editarea'] || '#f3f3f3'};
`;

export const Layout = {
  Main: styled.div`
    --dmee-layout-property-width: 350px;
    --dmee-edit-max-width: 1200px;

    --dmee-selected-border-color: #fc7e4b;
    --dmee-hover-font-color: red;

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
    overflow-y: auto;
    margin-top: var(--dmee-topbar-height);
  `,
  SettingPanel: styled.div`
    margin-top: var(--dmee-topbar-height);
    background-color: white;
    position: relative;
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
