import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';
import { TitleOutlined } from '@mui/icons-material';
import { Input } from '@mui/material';
import { Collapse } from 'react-bootstrap';

import { StyleSettings } from '../../../../styles/StyleSettings';
import { ToolDefinition, ToolRenderProps } from '../../../../ToolDefinition';
import { PropertyItem, Util } from '../../../utils';
import { getCommonBlockCss } from '../../../main/renderer/BlockRender';
import { BlockList } from 'Src/core/components/block-list';
import { BlockProperty } from 'Src/core/components/block-property';
import { BlockSettings } from 'Src/core/setting-panel/BlockSettings';

const defaultCss = css`
  & .dme-common-title span {
    cursor: pointer;
  }

  & .dme-common-title span::after {
    content: '\\25be';
    margin-left: 3px;
    font-size: 1.3rem;
  }

  & .dme-common-title.dme-common-open span::after {
    content: '\\25b4';
  }

  & .dme-common-title span:hover {
    background-color: #f0f0f0;
  }
`;

export const CollapsableText = (props: any) => {
  const [title, setTitle] = useState(props.blockdata.data.title);
  const [body, setBody] = useState(props.blockdata.data.body);

  const [commonSettings, setCommonSettings] = useState(props.blockdata.settings?.style || {});
  const [isChange, setIsChange] = useState(false);
  const [styleIdentifier, setStyleIdentifier] = useState(props.blockdata.style || '');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isChange) {
      props.onChange({
        ...props.blockdata,
        style: styleIdentifier,
        data: { title: title, body: body },
        settings: { style: commonSettings },
      });
      setIsChange(false);
    }
  }, [isChange]);

  return (
    <>
      {props.active && (
        <BlockProperty blocktype="collapsable_text" inBlock={props.inBlock}>
          <PropertyItem label="Text">
            <Input
              defaultValue={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsChange(true);
              }}
            />
          </PropertyItem>
          {Util.renderCustomProperty(props.blockdata)}
          <StyleSettings
            styleIdentifier={props.blockdata.style}
            blocktype="collapsable_text"
            onChange={(identifier) => {
              setStyleIdentifier(identifier);
              setIsChange(true);
            }}
          />
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
      <div
        style={commonSettings}
        className={defaultCss + ' ' + getCommonBlockCss('collapsable_text', styleIdentifier)}
      >
        <div
          className={'dme-common-title' + (open ? ' dme-common-open' : '')}
          onClick={() => setOpen(!open)}
        >
          <span>{title}</span>
        </div>
        <Collapse in={open}>
          <div className="dme-common-body">
            <BlockList
              view={props.view}
              allowedType={['text', 'heading', 'image']}
              onChange={(data) => {
                setBody(data);
                setIsChange(true);
              }}
              active={props.active}
              list={body}
              onActivate={() => {}}
            />
          </div>
        </Collapse>
      </div>
    </>
  );
};

export const toolCollapsableText: ToolDefinition = {
  type: 'collapsable_text',
  isComposited: false,
  name: 'Collapsable text',
  menu: { category: 'basic', icon: <TitleOutlined /> },
  initData: () => {
    return {
      type: 'collapsable_text',
      settings: {},
      data: {
        title: 'Show more',
        body: [
          {
            type: 'text',
            id: '2',
            data: [{ type: 'paragraph', children: [{ text: 'Default text' }] }],
          },
        ],
      },
    };
  },
  render: (props: ToolRenderProps) => <CollapsableText {...props} />,
};
