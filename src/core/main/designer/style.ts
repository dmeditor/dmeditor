import styled from '@emotion/styled';

export const Layout = {
  Main: styled.div`
    --dme-layout-property-width: 450px;
    --dme-container-width: calc(100vw - var(--dme-layout-property-width));
    --dme-main-width: clamp(900px, var(--dme-container-width) - 150px, 1200px);

    --dme-selected-border-color: #cccccc;
    --dme-hover-font-color: red;

    --dme-bg-color: #333333;

    height: 100vh;
    background-color: #f0f0f0;
    display: grid;
    grid-template-columns: var(--dme-container-width) var(--dme-layout-property-width);
    color: #333333;
    margin: 0px auto;
    background-color: #f3f3f3;
  `,
  Edit: styled.div`
    border-right: 1px solid #cccccc;
    overflow-y: auto;
    padding-top: var(--dme-topbar-height);
  `,
  SettingPanel: styled.div`
    padding-top: var(--dme-topbar-height);
    background-color: white;
  `,
};

export const EmtpyBlock = styled.div`
  height: 1px;
  margin-top: -1px;
`;

export const EditContainer = styled.div`
  height: 100%;
  margin: 0px 50px;
  background-color: white;
  border: 1px solid #cccccc;
`;

export const EditArea = styled.div`
  margin: auto;
  height: 100%;
  max-width: 90%;
  border: 1px dashed #999999;
`;

export const SettingContainer = styled.div`
  padding: 5px;
`;
