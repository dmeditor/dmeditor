import React, { useEffect, useState } from 'react';
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  PagesOutlined,
} from '@mui/icons-material';

import { StyleSettings } from '../../../../styles/StyleSettings';
import { ToolDefinition, ToolRenderProps } from '../../../../ToolDefinition';
import { PropertyButton, PropertyItem, Ranger, useGetDevice, Util } from '../../../utils';
import { getCommonBlockCss, getStyleCss } from '../../../main/renderer/BlockRender';
import { BlockProperty } from 'Src/core/components/block-property';
import { BlockSettings } from 'Src/core/setting-panel/BlockSettings';

export const BlockIframe = (props: ToolRenderProps) => {
  const [adding, setAdding] = useState(props.adding ? true : false);
  const [url, setUrl] = useState(props.blockdata.data);
  const [width, setWidth] = useState(props.blockdata.settings?.width || 400);
  const [height, setHeight] = useState(props.blockdata.settings?.height || 500);
  const [align, setAlign] = useState(props.blockdata.settings?.align || 'left');
  const [commonSettings, setCommonSettings] = useState(props.blockdata.settings?.style || {});
  const [styleIdentifier, setStyleIdentifier] = useState(props.blockdata.style);

  const isMobile = useGetDevice() === 'mobile';

  const submit = (val: any, type: string) => {
    setUrl(val);
    setAdding(false);
  };

  useEffect(() => {
    props.onChange({
      ...props.blockdata,
      data: url,
      settings: { width: width, height: height, align: align, style: commonSettings },
      style: styleIdentifier,
    });
  }, [url, width, align, height, commonSettings, styleIdentifier]);

  return (
    <div className={getCommonBlockCss('iframe', styleIdentifier)}>
      {adding && (
        <div>
          <Util.renderBroseURL type={'IFrame'} onConfirm={submit} adding={adding} />
        </div>
      )}
      {props.active && (
        <BlockProperty blocktype="iframe" inBlock={props.inBlock}>
          <PropertyItem label="Width">
            <Ranger
              min={300}
              max={1000}
              step={10}
              defaultValue={width}
              onChange={(v: number) => setWidth(v)}
            />
          </PropertyItem>
          <PropertyItem label="Height">
            <Ranger
              min={300}
              max={800}
              step={10}
              defaultValue={height}
              onChange={(v: number) => setHeight(v)}
            />
          </PropertyItem>
          <PropertyItem label="Align">
            <PropertyButton selected={align === 'left'} onClick={() => setAlign('left')}>
              <FormatAlignLeft />
            </PropertyButton>
            <PropertyButton selected={align === 'center'} onClick={() => setAlign('center')}>
              <FormatAlignCenter />
            </PropertyButton>
            <PropertyButton selected={align === 'right'} onClick={() => setAlign('right')}>
              <FormatAlignRight />
            </PropertyButton>
          </PropertyItem>
          {Util.renderCustomProperty(props.blockdata)}
          <StyleSettings
            styleIdentifier={props.blockdata.style || ''}
            blocktype="iframe"
            onChange={(identifier: string) => setStyleIdentifier(identifier)}
          />
          <div>
            <BlockSettings
              commonSettings={commonSettings}
              settingList={[]}
              onChange={(settings) => setCommonSettings(settings)}
              onDelete={props.onDelete}
            />
          </div>
        </BlockProperty>
      )}
      {url && (
        <div style={{ ...commonSettings, textAlign: align }}>
          <iframe
            src={url}
            width={isMobile ? '100%' : width}
            height={height}
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export const toolIframe: ToolDefinition = {
  type: 'iframe',
  name: 'IFrame',
  menu: { category: 'basic', icon: <PagesOutlined /> },
  initData: () => {
    return { type: 'iframe', data: '', settings: { width: 400, height: 500, align: 'center' } };
  },
  render: (props: ToolRenderProps) => <BlockIframe {...props} />,
};
