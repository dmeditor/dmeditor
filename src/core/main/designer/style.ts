import styled from '@emotion/styled';

export const Root = styled.div`
  --dme-bg-color: #1d4b64;
  --dme-topbar-height: 40px;
`;

export const Layout = {
  Main: styled.div`
    --dme-layout-property-width: 350px;
    --dme-edit-max-width: 1200px;

    --dme-selected-border-color: #fc7e4b;
    --dme-hover-font-color: red;

    --dme-bg-color: #333333;

    height: 100vh;
    background-color: #f0f0f0;
    display: grid;
    grid-template-columns: calc(100% - var(--dme-layout-property-width)) var(
        --dme-layout-property-width
      );
    color: #333333;
    margin: 0px auto;
    background-color: #f3f3f3;
  `,
  Edit: styled.div`
    border-right: 1px solid #cccccc;
    overflow-y: auto;
    margin-top: var(--dme-topbar-height);
  `,
  SettingPanel: styled.div`
    margin-top: var(--dme-topbar-height);
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
  max-width: var(--dme-edit-max-width);
  background-color: white;
  border: 1px solid #cccccc;
`;

export const EditArea = styled.div`
  margin: auto;
  min-height: calc(100vh - var(--dme-topbar-height));
  max-width: 90%;
  border: 1px dashed #999999;
`;

export const SettingContainer = styled.div``;
