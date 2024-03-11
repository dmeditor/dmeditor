import React, { useEffect, useRef, useState } from 'react';
import { AddCircleOutlineOutlined, DeleteOutline } from '@mui/icons-material';
import { orange } from '@mui/material/colors';
import { nanoid } from 'nanoid';

import { getAllowedTypes } from '..';
import { isNull } from '../../../utils';
import { Nav, NavItem } from '../../nav';
import { BaseTabs, TabPane } from './BaseTabs';
import type { EntityTabsBlock } from './entity';
import { useTabsStore } from './store';
import { BlockListRender, useEditorStore } from 'Src/core';
import type { DME } from 'Src/core/types';

const Tabs = (props: DME.WidgetRenderProps<EntityTabsBlock>) => {
  const {
    blockNode: { children: tabList = [], type },
    rootClasses,
    styleClasses,
  } = props;
  // const [activeTabIndex, setActiveTabIndex] = useState(-1);
  // const [key, setKey] = useState('1');
  const { updateSelectedBlock } = useEditorStore();
  const addTab = () => {
    updateSelectedBlock((_, block) => {
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

  // useEffect(() => {
  //   const query = new URLSearchParams(location.search);
  //   const tabKey = query.get('_dme_tab'); //todo: use id
  //   if (tabKey) {
  //     setKey(parseInt(tabKey));
  //   }
  // }, []);

  useEffect(() => {
    function handler(event: Event) {
      var elem = event.target as any;
      while (elem) {
        if (elem.className && elem.classList.contains('tabDiv')) {
          return;
        }
        elem = elem.parentNode;
      }
      // setActiveTabIndex(-1);
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
      <div className={rootClasses}>
        <BaseTabs
        // defaultActiveKey={key}
        >
          <Nav className={styleClasses['nav']}>
            {tabList.map((item, index) => (
              <NavItem tabKey={item.meta.tabKey} className={styleClasses['nav-item'] || 'dme-w-nav-item'}>
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
