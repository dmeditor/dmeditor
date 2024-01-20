import React, { useEffect, useRef, useState } from 'react';
import {
  DeleteOutline,
  GridViewOutlined,
  ListAltOutlined,
  TitleOutlined,
} from '@mui/icons-material';

import { getCommonBlockCss } from '../../../main/renderer/BlockRender';
import { BlockList } from '../../block-list';
import { BlockProperty } from '../../block-property';
import { CommonSettings } from '../../CommonSettings';
import { StyleSettings } from '../../../../styles/StyleSettings';
import { ToolDefinition, ToolRenderProps } from '../../../../ToolDefinition';
import { PropertyButton, PropertyItem, Ranger, Util } from '../../../utils';

export const ContainerList = (props: any) => {
  const [children, setChildren] = useState(props.blockdata.children);
  const [isChange, setIsChange] = useState(false);
  const [styleIdentifier, setStyleIdentifier] = useState(props.blockdata.style || '');

  useEffect(() => {
    if (isChange) {
      props.onChange({ ...props.blockdata, style: styleIdentifier, children: children });
      setIsChange(false);
    }
  }, [isChange]);

  return (
    <>
      {props.active && (
        <BlockProperty blocktype="list" inBlock={props.inBlock}>
          <StyleSettings
            styleIdentifier={props.blockdata.style || ''}
            blocktype="list"
            onChange={(identifier) => {
              setStyleIdentifier(identifier);
              setIsChange(true);
            }}
          />
          {props.onDelete && (
            <div style={{ float: 'right' }}>
              <PropertyButton
                color="warning"
                title="Delete"
                onClick={() => {
                  if (props.onDelete) props.onDelete();
                }}
              >
                <DeleteOutline />
              </PropertyButton>
            </div>
          )}
        </BlockProperty>
      )}
      <div className={getCommonBlockCss('list', styleIdentifier)}>
        <BlockList
          view={props.view}
          allowedType={['heading', 'image', 'text', 'collapsable_text']}
          onChange={(data) => {
            setChildren(data);
            setIsChange(true);
          }}
          active={props.active}
          list={children}
          onActivate={() => {}}
        />
      </div>
    </>
  );
};

export const toolContainerList: ToolDefinition = {
  type: 'list',
  isComposited: false,
  name: 'List',
  menu: { category: 'layout', icon: <ListAltOutlined /> },
  initData: () => {
    return {
      type: 'list',
      settings: {},
      children: [
        { type: 'heading', settings: { level: 2 }, data: 'Heading' },
        {
          type: 'text',
          id: '2',
          data: [{ type: 'paragraph', children: [{ text: 'Default text 1' }] }],
        },
      ],
    };
  },
  render: (props: ToolRenderProps) => <ContainerList {...props} />,
};
