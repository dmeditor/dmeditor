import * as React from 'react';
import {
  HelpOutline,
  LaptopMacOutlined,
  ModeEditOutline,
  PhoneIphoneOutlined,
  SettingsOutlined,
  TabletMacOutlined,
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import type { LayoutMode } from '../main';

interface LeftContentProps {
  layoutMode: LayoutMode;
  onChangeLayoutMode: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    mode: LayoutMode,
  ) => void;
  onChangeReadonlyMode: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    readonlyMode: boolean,
  ) => void;
  settingsShown: boolean;
  showSettings: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  menu?: React.ReactNode;
  readonlyMode?: boolean;
}

const Toolbar = ({
  menu,
  layoutMode,
  onChangeLayoutMode,
  onChangeReadonlyMode,
  readonlyMode,
  settingsShown,
  showSettings,
  ...rest
}: LeftContentProps) => {
  const { t } = useTranslation();

  return (
    <div className="layout-left">
      <div className={!!readonlyMode ? 'layout-left-menu view' : 'layout-left-menu'}>
        {menu ? (
          menu
        ) : (
          <a target="_blank" title="dmeditor" href="https://dmeditor.io">
            <div style={{ paddingTop: '5px' }}>
              <HelpOutline />
            </div>
          </a>
        )}
        <div
          className="left-tool"
          style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center' }}
        >
          <Tooltip title={t('Edit')} arrow placement="right">
            <a
              href="/"
              className={!!readonlyMode ? 'current' : ''}
              onClick={(e) => {
                // onChangeLayoutMode(e, 'edit');
                onChangeReadonlyMode(e, false);
              }}
            >
              <ModeEditOutline />
            </a>
          </Tooltip>
          <Tooltip title={t('Desktop')} arrow placement="right">
            <a
              href="/"
              className={layoutMode === 'pc' ? 'current' : ''}
              onClick={(e) => {
                onChangeLayoutMode(e, 'pc');
              }}
            >
              <LaptopMacOutlined />
            </a>
          </Tooltip>
          <Tooltip title={t('Mobile')} arrow placement="right">
            <a
              href="/"
              className={layoutMode === 'mobile' ? 'current' : ''}
              onClick={(e) => {
                onChangeLayoutMode(e, 'mobile');
              }}
            >
              <PhoneIphoneOutlined />
            </a>
          </Tooltip>
          <Tooltip title={t('Tablet')} arrow placement="right">
            <a
              href="/"
              className={layoutMode == 'tablet' ? 'current' : ''}
              onClick={(e) => {
                onChangeLayoutMode(e, 'tablet');
              }}
            >
              <TabletMacOutlined />
            </a>
          </Tooltip>
          <hr />
          <Tooltip title={t('Settings')} arrow placement="right">
            <a href="/" className={settingsShown ? 'current' : ''} onClick={(e) => showSettings(e)}>
              <SettingsOutlined />
            </a>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
