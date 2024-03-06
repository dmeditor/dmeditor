import { useEffect } from 'react';
import {
  ArrowDropDown,
  ComputerOutlined,
  EditOutlined,
  ExpandMore,
  ExpandMoreOutlined,
  LayersOutlined,
  MoreHorizOutlined,
  Save,
  Send,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import emitter from 'dmeditor/utils/event';

import { useEditorStore } from '../main/store';
import { ActionsContainer, Container, Logo, LogoContainer, ToolsContainer } from './style';

const ToolButton = (props?: object) => (
  <Button
    sx={{ textTransform: 'none', color: '#a6d8ed', fontSize: 16, marginLeft: '5px' }}
    {...props}
  ></Button>
);

export const TopBar = () => {
  const largeIcon = { style: { fontSize: '28px' } };
  const smallIcon = { style: { fontSize: '20px', marginLeft: 2 } };
  const { storage, page } = useEditorStore();

  const save = () => {
    emitter.emit('save', { data: storage, page: page });
  };

  return (
    <Container>
      <LogoContainer>
        <a href="https://dmeditor.io">
          <Logo src={'https://dmeditor.io/_assets/images/logo2.png'} />
        </a>{' '}
        {/* todo: import locally */}
      </LogoContainer>
      <ToolsContainer>
        <ToolButton>
          <Tooltip title="Edit mode">
            <EditOutlined {...largeIcon} />
          </Tooltip>
        </ToolButton>
        <ToolButton>
          <Tooltip title="Preview">
            <ComputerOutlined {...largeIcon} />
          </Tooltip>
        </ToolButton>
        <ToolButton>
          <ArrowDropDown {...largeIcon} />
        </ToolButton>
        <ToolButton>
          <Tooltip title="Layers">
            <LayersOutlined {...largeIcon} />
          </Tooltip>
        </ToolButton>
      </ToolsContainer>
      <ActionsContainer>
        <ToolButton onClick={save}>
          Save <Save {...smallIcon} />
        </ToolButton>
        <ToolButton>
          <ShoppingBagOutlined />
        </ToolButton>
      </ActionsContainer>
    </Container>
  );
};
