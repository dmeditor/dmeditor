import { ReactElement, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import { tabCss } from './Tab.css';

export interface TabData {
  title: string;
  element: ReactElement;
}

export const PropertyTab = (props: { tabs: Array<TabData>; active?: number }) => {
  const [active, setActive] = useState(props.active ? props.active : 0);

  useEffect(() => {
    setActive(props.active ? props.active : 0);
  }, [props.active]);

  return (
    <div className={tabCss()}>
      <div className="tab-header-container">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={false} onChange={(e: any, newValue: number) => setActive(newValue)}>
            {props.tabs.map((tab: TabData, index: number) => (
              <Tab
                key={index}
                style={{ textTransform: 'none' }}
                className={index === active ? 'tab-active' : ''}
                label={tab.title}
              />
            ))}
          </Tabs>
        </Box>
      </div>
      {props.tabs.map((tab: TabData, index: number) => (
        <div
          key={index}
          className="tab-content"
          style={{ display: active == index ? 'block' : 'none' }}
        >
          {tab.element}
        </div>
      ))}
    </div>
  );
};
