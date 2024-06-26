import * as React from 'react';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { orange } from '@mui/material/colors';
import { nanoid } from 'nanoid';

import { BlockListRender, useEditorStore } from '../..';
import type { DME } from '../..';
import { Nav, NavItem } from '../../core/components/nav';
import { getAllowedTypes, isNull } from '../../core/utils';
import { BaseTabs, TabPane } from './BaseTabs';
import type { EntityTabsBlock } from './entity';
import { useTabsStore } from './store';

const { useEffect } = React;

const Tabs = (props: DME.WidgetRenderProps<EntityTabsBlock>) => {
  const {
    blockNode: { children: tabList = [], type },
    rootClasses,
    styleClasses,
    path,
  } = props;

  const { updateBlockByPath } = useEditorStore();

  const addTab = () => {
    updateBlockByPath(path, (_, block) => {
      if (!block.children) {
        console.error('Tabs children not found!');
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

  const { setActiveKey } = useTabsStore();
  const handleSelect = (key: string | number) => {
    if (isNull(key)) return;
    setActiveKey(key);
  };

  return (
    <>
      <div>
        <BaseTabs
        // defaultActiveKey={key}
        >
          <Nav className={styleClasses['nav']}>
            {tabList.map((item, index) => (
              <NavItem
                tabKey={item.meta.tabKey}
                className={styleClasses['nav-item'] || 'dme-w-nav-item'}
              >
                {`${item?.meta?.title}` ?? ''}
              </NavItem>
            ))}
            <span className="flex items-center">
              <AddCircleOutlineOutlined
                style={{ cursor: 'pointer' }}
                onClick={addTab}
                sx={{ color: orange[500] }}
              />
            </span>
          </Nav>
          <div>
            {tabList.map((item, index) => {
              return (
                <TabPane key={item.id} tabKey={item.meta.tabKey} title={item.data}>
                  <div>
                    <BlockListRender
                      mode={props.mode}
                      blockData={item.children || []}
                      path={props.path.concat(index)}
                      // direction={direction}
                      onSelect={handleSelect}
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
