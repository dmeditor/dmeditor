import { useState } from 'react';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
// import ArrowDropUpIcon from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { DME } from 'dmeditor/index';
import { BlockListRender } from 'dmeditor/main/renderer';
import { nanoid } from 'nanoid';

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
        style: { _: 'default' },
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
    styleClasses,
  } = props;

  return (
    <div className={rootClasses}>
      <div className={styleClasses['button-container'] || '' + ' dme-w-button-container'}>
        <button
          className={styleClasses['button'] || '' + ' dme-w-button'}
          onClick={() => setExpanded(!expanded)}
        >
          Show more
          {expanded ? <ArrowDropUp /> : <ArrowDropDown />}
        </button>
      </div>
      <Collapse in={expanded}>
        <BlockListRender blockData={children} path={path} mode={props.mode} />
      </Collapse>
    </div>
  );
};
