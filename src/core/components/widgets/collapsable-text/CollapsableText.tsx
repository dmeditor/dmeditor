import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Collapse } from '@mui/material';
import { nanoid } from 'nanoid';

import { DME } from 'Core/index';
import { BlockListRender } from 'Src/core/main/renderer';

interface CollapsableTextEntity {}

export const CollapsableTextDefiniation: DME.Widget = {
  category: 'widget',
  name: 'Collapsable text',
  type: 'collapsable-text',
  icon: 'collapsable-text',
  settings: [],
  events: {
    createBlock: () => {
      return {
        id: nanoid(),
        data: {},
        type: 'collapsable-text',
        children: [
          {
            id: '0',
            data: {},
            type: 'list',
            children: [],
          },
        ],
      };
    },
    updateData: () => {},
  },
};

export const CollapsableText = (props: DME.WidgetRenderProps<CollapsableTextEntity>) => {
  const [expanded, setExpanded] = useState(true);
  const {
    blockNode: { children = [] },
    path,
    rootClasses,
  } = props;

  return (
    <div className={rootClasses}>
      <div style={{ cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
        <span>Show more</span>
        {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </div>
      <Collapse in={expanded}>
        <BlockListRender blockData={children} path={path} />
      </Collapse>
    </div>
  );
};
