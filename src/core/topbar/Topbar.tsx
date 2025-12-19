import { useEffect, useState } from 'react';
import {
  ArrowDownward,
  ArrowDropDown,
  ArrowDropDownOutlined,
  Cancel,
  CloseFullscreenOutlined,
  ComputerOutlined,
  EditOutlined,
  ExpandMore,
  ExpandMoreOutlined,
  HelpOutlineOutlined,
  LayersOutlined,
  MoreHorizOutlined,
  MoreVertOutlined,
  OpenInFullOutlined,
  Save,
  Send,
  ShoppingBagOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Button, Divider, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';

import emitter from '../../core/utils/event';
import { dmeConfig } from '../config';
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
      background: props.selected ? '#337ca2' : 'none',
      color: props.selected ? '#ffffff' : '#a6d8ed',
      ':hover': {
        background: '#337ca2',
      },
      marginLeft: '5px',
    }}
    {...props}
  ></Button>
);

export const TopBar = () => {
  const { storage, page, mode, setMode } = useEditorStore();

  const save = () => {
    setDevice('');
    emitter.emit('save', { data: storage, page: page });
  };

  const cancel = () => {
    setDevice('');
    emitter.emit('cancel', { data: storage, page: page });
  };

  const changeMode = (mode: DME.Mode) => {
    setDevice('');
    setMode(mode);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const switchFullScreen = () => {
    closeMenu();
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.body.requestFullscreen();
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', (event) => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    });
  }, []);

  return (
    <Container>
      <LogoContainer>
        <a href="https://dmeditor.io" target="_blank">
          <Logo src="https://dmeditor.io/logo.png" />
        </a>{' '}
        {/* todo: import locally */}
      </LogoContainer>
      {dmeConfig.callbacks.topBarLeftRender && <dmeConfig.callbacks.topBarLeftRender />}
      <ToolsContainer className={dmeConfig.editor.panelClassNames['top-bar-tools']}>
        <ToolButton selected={mode === 'edit'} onClick={() => changeMode('edit')}>
          <Tooltip title={i18n('Edit')}>
            <EditOutlined />
          </Tooltip>
        </ToolButton>
        <span style={{ borderRight: '1px solid #cccccc', marginLeft: '4px' }}>&nbsp;</span>
        <ToolButton selected={mode === 'view'} onClick={() => changeMode('view')}>
          <Tooltip title={i18n('Preview')}>
            <VisibilityOutlined />
          </Tooltip>
        </ToolButton>
      </ToolsContainer>
      {dmeConfig.callbacks.topBarRightRender && <dmeConfig.callbacks.topBarRightRender />}
      <ActionsContainer>
        <ToolButton onClick={save}>
          {i18n('Save', 'tool')}&nbsp;
          <Save />
        </ToolButton>
        <ToolButton onClick={cancel}>
          {i18n('Cancel', 'tool')}&nbsp;
          <Cancel />
        </ToolButton>
        <ToolButton
          onClick={(e) => {
            setMenuOpen(true);
            setAnchorEl(e.currentTarget);
          }}
        >
          <MoreVertOutlined />
        </ToolButton>
      </ActionsContainer>
      <Menu open={menuOpen} anchorEl={anchorEl} onClose={closeMenu}>
        <MenuItem onClick={switchFullScreen}>
          {!isFullScreen ? (
            <>
              <OpenInFullOutlined fontSize="small" /> &nbsp; Full screen
            </>
          ) : (
            <>
              <CloseFullscreenOutlined fontSize="small" /> &nbsp; Exit full screen
            </>
          )}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            closeMenu();
            window.open('https://dmeditor.io/user-guide', '_blank', 'noopener,noreferrer');
          }}
        >
          <HelpOutlineOutlined fontSize="small" /> &nbsp; Help
        </MenuItem>
      </Menu>
    </Container>
  );
};
