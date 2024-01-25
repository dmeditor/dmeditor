import { ReactElement, useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

import { css } from '@emotion/css';

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
    <div>
      <div className={css `
      padding: 6px;`}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={active} onChange={(e: any, newValue: number) => setActive(newValue)}>
            {props.tabs.map((tab: TabData, index: number) => (
              <Tab
                key={tab.title}                
                sx={{ textTransform: 'none' }}               
                label={tab.title}
              />
            ))}
          </Tabs>
        </Box>
      </div>
      {props.tabs.map((tab: TabData, index: number) => (
        <div
          key={tab.title}
          style={{ display: active == index ? 'block' : 'none' }}
        >
          {tab.element}
        </div>
      ))}
    </div>
  );
};
