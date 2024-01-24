import {
  ArrowDropDown,
  ComputerOutlined,
  EditOutlined,
  LayersOutlined,
  Save,
  Send,
} from '@mui/icons-material';
import { Button } from '@mui/material';

import { ActionsContainer, Container, Logo, LogoContainer, ToolsContainer } from './style';

const ToolButton = (props?: object) => (
  <Button sx={{ textTransform: 'none', color: '#a6d8ed', fontSize: 16, marginLeft: '5px' }} {...props}></Button>
);

export const TopBar = () => {
  const largeIcon = { style: { fontSize: '28px' } };
  const smallIcon = { style: { fontSize: '20px',marginLeft: 2 } };

  return (
    <Container>
      <LogoContainer>
        <a href="https://dmeditor.io"><Logo src={'https://dmeditor.io/_assets/images/logo2.png'} /></a> {/* todo: import locally */}
      </LogoContainer>
      <ToolsContainer>
        <ToolButton>
          <EditOutlined {...largeIcon} />
        </ToolButton>
        <ToolButton>
          <ComputerOutlined {...largeIcon} />
        </ToolButton>
        <ToolButton>
          <ArrowDropDown {...largeIcon} />
        </ToolButton>
        <ToolButton>
          <LayersOutlined {...largeIcon} />
        </ToolButton>
      </ToolsContainer>
      <ActionsContainer>
        <ToolButton>
          Save draft <Save {...smallIcon} />
        </ToolButton>
        <ToolButton>
          Publish <Send {...smallIcon} />
        </ToolButton>
      </ActionsContainer>
    </Container>
  );
};
