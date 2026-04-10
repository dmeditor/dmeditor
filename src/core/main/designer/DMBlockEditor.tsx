import * as React from 'react';
import { ComponentType, useMemo } from 'react';
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/css';
import { LaptopMacOutlined, PhoneIphoneOutlined } from '@mui/icons-material';
import { Button, ThemeProvider, Tooltip } from '@mui/material';
import useResizeObserver from '@react-hook/resize-observer';
import { i18n } from 'dmeditor/core/i18n';
import { useResizable } from 'react-resizable-layout';

import { BlockSettings } from '../../../core/setting-panel/block-setting/BlockSettings';
import { getPageTheme, setPageSettings } from '../../components/page';
import { dmeConfig } from '../../config';
import { DeviceType, setDevice, useDevice } from '../../hooks/useDeivce';
import SettingPanel from '../../setting-panel';
import { TopBar } from '../../topbar/Topbar';
import { DME, DMEData } from '../../types/dmeditor';
import emitter from '../../utils/event';
import { BlockListRender, BlockRender, DMEditorView } from '../renderer';
import { useEditorStore } from '../store';
import { loadData } from '../store/helper';
import { EditSideTools } from './EditSideTools';
import { LayoutRender } from './LayoutRender';
import { muiTheme } from './muiTheme';
import {
  EditContainer,
  EditContentArea,
  EmtpyBlock,
  Layout,
  Root,
  SettingContainer,
  View,
} from './style';
import { ViewDevices } from './ViewDevices';

export interface DMBlockEditorProps {
  projectStyle?: string;
  onSave?: (savedData: DMEData.SavedData) => void;
  onChange?: (savedData: DMEData.SavedData) => void;
  onCancel?: (callback: () => void) => void;
}

export interface DMBlockEditorRefType {
  setData: (data: string | Array<DMEData.Block>) => void;
  setPageSettings: (settings: Array<DME.PageSetting | ComponentType>) => void;
  setPageData: (data: DMEData.Page) => void;
}

const previewDeviceWidths = {
  pc: [1200, 1000],
  tablet: [810, 800],
  mobile: [400, 400],
};

export const DMBlockEditor = (props: {
  data: DMEData.Block;
  mainViewMode?: boolean;
  mainRef: HTMLDivElement | null;
  settingsRef: HTMLDivElement | null;
  hideStyle?: boolean;
}) =>
  // props: DMBlockEditorProps,
  // currentRef: React.ForwardedRef<DMBlockEditorRefType>,
  {
    const { mainViewMode = false, hideStyle = false } = props;
    const { storage, setStorage, setSelected } = useEditorStore();

    useEffect(() => {
      if (props.data) {
        setStorage([props.data]);
        setSelected(0);
      }
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const editRef = useRef<HTMLDivElement>(null);
    const [variables, initVariables] = useState<React.CSSProperties>({});

    if (storage.length === 0) {
      return <div>No data</div>;
    }
    if (!props.mainRef || !props.settingsRef) {
      return <div>No ref</div>;
    }
    return (
      <div>
        <div>
          {createPortal(
            <BlockRender path={[0]} data={storage[0]} mode={mainViewMode ? 'view' : 'edit'} />,
            props.mainRef,
          )}
          {createPortal(
            <BlockSettings
              hideStyle={hideStyle}
              blockPath={[0]}
              blockData={storage[0]}
              selectedPath={[0]}
              rootWidget={storage[0].type}
            />,
            props.settingsRef,
          )}
        </div>
      </div>
    );
  };
