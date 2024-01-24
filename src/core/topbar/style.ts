import styled from '@emotion/styled';

export const Container = styled.div`
  height: var(--dme-topbar-height);
  background-color: var(--dme-bg-color);
  color: white;
  display: flex;
  position: fixed;
  top:0px;
  width: 100%;
  z-index: 100;
`;
export const LogoContainer = styled.div`
  width: 10%;
  padding-left: 5px;
`;

export const Logo = styled.img`
  width: 30px;
  margin-top: 5px;
  margin-left: 15px;
`;

export const ToolsContainer = styled.div`
  width: 60%;
  text-align: center;
`;

export const ActionsContainer = styled.div`
  width: 30%;
  padding-right: 20px;
  text-align: right;
`;