import styled from '@emotion/styled';

export const MainLayout = styled.div`
  --dme-layout-property-width: 300px;
  --dme-container-width: calc(
    100vw - 2px - var(--dme-layout-property-width)
  );
  --dme-main-width: clamp(900px, var(--dme-container-width) - 150px, 1200px);

  --dme-selected-border-color: #cccccc;
  --dme-hover-font-color: red;

  --dme-bg-color: #333333;

  height: calc(100vh - var(--dme-topbar-height));
  background-color: #f0f0f0;
  display: grid;
  grid-template-columns: var(--dme-container-width) var(--dme-layout-property-width);
  color: #333333;
  margin: var(--dme-topbar-height) auto 0px auto;
  background-color: #f3f3f3;
`;

export const EditContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid #cccccc;
`;


export const EditArea = styled.div`
    margin: auto;
    background: white;
    min-height: 100vh;
    max-width: 90%;
    box-shadow: 0px 2px 3px #cccccc;
`;

export const SettingContainer = styled.div`  
  padding: 5px;
  background-color: white;
`