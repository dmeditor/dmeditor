import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { CodeOutlined } from '@mui/icons-material';

import { getCommonBlockCss } from '../../block/Block';
import { BlockProperty } from 'Src/core/components/block-property';
import { CommonSettings } from 'Core/setting-panel/common-setting';
import { ToolDefinition, ToolRenderProps } from '../../../../ToolDefinition';
import { Util } from '../../../utils';

export const Code = (props: ToolRenderProps) => {
  const [content, SetContent] = useState(props.blockdata.data);
  const [commonSettings, setCommonSettings] = useState(props.blockdata.settings?.style || {});
  const [isChange, setIsChange] = useState(false);

  const changer = (e: React.FocusEvent<HTMLElement>) => {
    SetContent(e.target.innerText);
    setIsChange(true);
  };
  useEffect(() => {
    if (isChange) {
      props.onChange({ ...props.blockdata, data: content, settings: { style: commonSettings } });
      setIsChange(false);
    }
  }, [isChange]);

  return (
    <>
      {props.active && (
        <BlockProperty blocktype="code" inBlock={props.inBlock}>
          {Util.renderCustomProperty(props.blockdata)}
          <div>
            <CommonSettings
              commonSettings={commonSettings}
              settingList={[]}
              onChange={(settings) => {
                setCommonSettings(settings);
                setIsChange(true);
              }}
              onDelete={props.onDelete}
            />
          </div>
        </BlockProperty>
      )}
      <div style={commonSettings} className={getCommonBlockCss('code')}>
        <code
          className={css({
            padding: '0.5em 0.8em',
            margin: 0,
            fontSize: '85%',
            backgroundColor: 'rgba(175, 184, 193, .1)',
            width: '100%',
            display: 'block',
            whiteSpace: 'pre-line',
            boxSizing: 'border-box',
            color: '#333333',
          })}
          suppressContentEditableWarning
          contentEditable={props.active}
          onBlur={(e) => {
            changer(e);
          }}
        >
          {content}
        </code>
      </div>
    </>
  );
};
export const toolCode: ToolDefinition = {
  type: 'code',
  name: 'Code',
  menu: {
    category: 'basic',
    icon: <CodeOutlined />,
  },
  initData: () => {
    return { type: 'code', data: '<script></script>', settings: {} };
  },
  render: (props: ToolRenderProps) => <Code {...props} />,
};
