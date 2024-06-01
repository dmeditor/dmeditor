import styled from '@emotion/styled';

export const Container = styled.div`
  height: var(--dmee-topbar-height);
  background-color: var(--dmee-bg-color);
  color: white;
  display: flex;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 100;
`;
export const LogoContainer = styled.div`
  width: 10%;
  padding: 8px 0px;
`;

export const Logo = styled.img`
  max-height: 24px;
  margin-left: 15px;
`;

export const ToolsContainer = styled.div`
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionsContainer = styled.div`
  width: 25%;
  padding-right: 10px;
  display: flex;
  justify-content: right;
`;
