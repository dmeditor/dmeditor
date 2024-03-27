import { useEffect, useRef, useState } from 'react';
import { TitleOutlined } from '@mui/icons-material';
import { BlockProperty } from 'dmeditor/components/block-property';
import { BlockSettings } from 'dmeditor/setting-panel/BlockSettings';

import { getCommonBlockCss } from '../../../main/renderer/BlockRender';
import { ToolDefinition, ToolRenderProps } from '../../../ToolDefinition';
import { Util } from '../../../utils';

export const Quote = (props: ToolRenderProps) => {
  const [content, setConent] = useState(props.blockdata.data);
  const [commonSettings, setCommonSettings] = useState(props.blockdata.settings?.style || {});
  const QuoteRef: any = useRef(null);
  const [isChange, setIsChange] = useState(false);

  const change = (e?: any) => {
    const text = QuoteRef.current.innerText;
    setConent(text);
    setIsChange(true);
  };

  const common = {
    onBlur: change,
    contentEditable: props.active,
    style: { ...commonSettings },
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
        <BlockProperty blocktype="quote" inBlock={props.inBlock}>
          {Util.renderCustomProperty(props.blockdata)}
          <div>
            <BlockSettings
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
      <div style={commonSettings} className={getCommonBlockCss('quote')}>
        <q ref={QuoteRef} className="block-quote" {...common} suppressContentEditableWarning>
          {content}
        </q>
      </div>
    </>
  );
};

export const toolQuote: ToolDefinition = {
  type: 'quote',
  isComposited: false,
  name: 'Quote',
  menu: { category: 'basic', icon: <TitleOutlined /> },
  initData: () => {
    return { type: 'quote', settings: {}, data: '' };
  },
  render: (props: ToolRenderProps) => <Quote {...props} />,
};
