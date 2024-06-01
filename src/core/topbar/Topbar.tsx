import { useEffect } from 'react';
import {
  ArrowDownward,
  ArrowDropDown,
  ArrowDropDownOutlined,
  Cancel,
  ComputerOutlined,
  EditOutlined,
  ExpandMore,
  ExpandMoreOutlined,
  LayersOutlined,
  MoreHorizOutlined,
  Save,
  Send,
  ShoppingBagOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Button, IconButton, Tooltip } from '@mui/material';

import emitter from '../../core/utils/event';
import { setDevice } from '../hooks/useDeivce';
import { i18n } from '../i18n';
import { useEditorStore } from '../main/store';
import { DME } from '../types';
import { ActionsContainer, Container, Logo, LogoContainer, ToolsContainer } from './style';

export const largeIcon = { style: { fontSize: '28px' } };
export const smallIcon = { style: { fontSize: '20px', marginLeft: 2 } };

export const ToolButton = (props) => (
  <Button
    sx={{
      textTransform: 'none',
      background: props.selected ? '#0a2c3e' : 'none',
      color: props.selected ? '#ffffff' : '#a6d8ed',
      ':hover': {
        background: '#0a2c3e',
      },
      marginLeft: '5px',
    }}
    {...props}
  ></Button>
);

export const TopBar = () => {
  const { storage, page, mode, setMode } = useEditorStore();

  const save = () => {
    emitter.emit('save', { data: storage, page: page });
  };

  const cancel = () => {
    emitter.emit('cancel', { data: storage, page: page });
  };

  const changeMode = (mode: DME.Mode) => {
    setDevice('');
    setMode(mode);
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
        <ToolButton selected={mode === 'edit'} onClick={() => changeMode('edit')}>
          <Tooltip title="Edit">
            <EditOutlined />
          </Tooltip>
        </ToolButton>
        <span style={{ borderRight: '1px solid #cccccc', marginLeft: '4px' }}>&nbsp;</span>
        <ToolButton selected={mode === 'view'} onClick={() => changeMode('view')}>
          <Tooltip title="Preview">
            <VisibilityOutlined />
          </Tooltip>
        </ToolButton>
        {/* <ToolButton>
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
        </ToolButton> */}
      </ToolsContainer>
      <ActionsContainer>
        <ToolButton onClick={save}>
          {i18n('Save', 'tool')} <Save />
        </ToolButton>
        <ToolButton onClick={cancel}>
          {i18n('Cancel', 'tool')} <Cancel />
        </ToolButton>
        {/* <ToolButton>
          <ShoppingBagOutlined />
        </ToolButton> */}
      </ActionsContainer>
    </Container>
  );
};
