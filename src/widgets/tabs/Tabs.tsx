import * as React from 'react';
import { useEffect } from 'react';
import { AddCircleOutlineOutlined, AddOutlined } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { orange } from '@mui/material/colors';
import { useGlobalVars } from 'dmeditor/core/main/store';
import { nanoid } from 'nanoid';

import { BlockListRender, useEditorStore, type DME } from '../..';
import { Nav, NavItem } from '../../core/components/nav';
import { getAllowedTypes } from '../../core/utils';
import { logger } from '../../core/utils/log';
import { BaseTabs, TabPane } from './BaseTabs';
import type { EntityTabsBlock, EntityTabsData } from './entity';

const Tabs: React.FC<DME.WidgetRenderProps<EntityTabsData, EntityTabsBlock[]>> = (props) => {
  const {
    blockNode: { children: tabList = [], type, data },
    styleClasses,
    path,
  } = props;

  const { updateBlockByPath } = useEditorStore();
  const { vars, setVar } = useGlobalVars();
  const [activeKey, setActiveKey] = React.useState<string | number>(
    tabList.length > 0 ? tabList[0].meta.tabKey : '1',
  );

  const addTab = () => {
    updateBlockByPath(path, (_, block) => {
      if (!block.children) {
        logger.error('Tabs children not found!');
        return;
      }
      block.children.push({
        data: null,
        meta: {
          tabKey: 't' + (block.children.length + 1),
          title: 'New Tab',
        },
        children: [
          {
            type: 'text',
            id: nanoid(),
            data: {
              value: [
                {
                  type: 'paragraph',
                  children: [{ text: 'Sample text' }],
                },
              ],
            },
          },
        ],
      });
    });
  };

  const identifier = data.settings?.general?.identifier || '';
  useEffect(() => {
    if (identifier && vars[identifier]) {
      setActiveKey(vars[identifier]);
    }
  }, [vars[identifier]]);

  useEffect(() => {
    function handler(event: Event) {
      var elem = event.target as any;
      while (elem) {
        if (elem.className && elem.classList.contains('tabDiv')) {
          return;
        }
        elem = elem.parentNode;
      }
    }
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  const tabChange = (key: string | number) => {
    setActiveKey(key);
    const identifier = data.settings?.general?.identifier;
    if (identifier) {
      setVar(identifier, key);
    }
  };

  return (
    <>
      <div>
        <BaseTabs activeKey={activeKey}>
          <Nav className={styleClasses['nav']}>
            {tabList.map(({ meta: { tabKey, title } }) => (
              <NavItem
                key={tabKey}
                activeKey={activeKey}
                onTabClick={tabChange}
                tabKey={tabKey}
                className={
                  (activeKey === tabKey ? styleClasses['active'] + ' ' : '') +
                  (styleClasses['nav-item'] || 'dme-w-nav-item')
                }
              >
                <>{title ?? ''}</>
              </NavItem>
            ))}
            {props.mode === 'edit' && (
              <IconButton onClick={addTab} color="warning" size="small">
                <AddOutlined />
              </IconButton>
            )}
          </Nav>

          <div>
            {tabList.map(({ meta: { tabKey, title }, children }, index) => {
              return (
                <TabPane activeKey={activeKey} key={index} tabKey={tabKey} title={title}>
                  <div className={styleClasses['body'] || 'dme-w-body'}>
                    <BlockListRender
                      mode={props.mode}
                      blockData={children || []}
                      path={props.path.concat(index)}
                      allowedTypes={getAllowedTypes(type)}
                    />
                  </div>
                </TabPane>
              );
            })}
          </div>
        </BaseTabs>
      </div>
    </>
  );
};

export default Tabs;
