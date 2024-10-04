import * as React from 'react';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { orange } from '@mui/material/colors';
import { nanoid } from 'nanoid';

import { BlockListRender, useEditorStore, type DME } from '../..';
import { Nav, NavItem } from '../../core/components/nav';
import { getAllowedTypes } from '../../core/utils';
import { logger } from '../../core/utils/log';
import { BaseTabs, TabPane } from './BaseTabs';
import type { EntityTabsBlock, EntityTabsData } from './entity';

const Tabs: React.FC<DME.WidgetRenderProps<EntityTabsData, EntityTabsBlock>> = (props) => {
  const {
    blockNode: { children: tabList = [], type },
    styleClasses,
    path,
  } = props;

  const { updateBlockByPath } = useEditorStore();
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
        type: 'list',
        id: nanoid(),
        data: null,
        meta: {
          tabKey: nanoid(),
          title: 'New Tab',
        },
        children: [
          {
            type: 'text',
            id: '2',
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

  React.useEffect(() => {
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

  return (
    <>
      <div>
        <BaseTabs activeKey={activeKey}>
          <Nav className={styleClasses['nav']}>
            {tabList.map(({ meta: { tabKey, title } }) => (
              <NavItem
                activeKey={activeKey}
                onTabClick={(key) => setActiveKey(key)}
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
              <span className="flex items-center">
                <AddCircleOutlineOutlined
                  style={{ cursor: 'pointer' }}
                  onClick={addTab}
                  sx={{ color: orange[500] }}
                />
              </span>
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
