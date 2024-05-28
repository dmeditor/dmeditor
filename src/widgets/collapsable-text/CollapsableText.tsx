import { useState } from 'react';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { nanoid } from 'nanoid';

import { BlockListRender, dmeConfig } from '../..';
import type { DME, DMEData } from '../..';
import { generalSettings } from '../../core/setting-panel/property-setting';

interface CollapsableTextEntity {
  text: string;
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}

export const CollapsableTextDefiniation: DME.Widget = {
  category: 'intractive',
  name: 'Collapsable text',
  type: 'collapsable-text',
  icon: 'collapsable-text',
  settings: [
    {
      name: 'Text',
      property: '.text',
      settingComponent: 'input',
    },
    ...generalSettings,
  ],
  events: {
    createBlock: () => {
      const defaultStyle = dmeConfig.widgets['collapsable-text']?.defaultStyle;
      const styleObj = defaultStyle ? { style: defaultStyle } : {};
      return {
        id: nanoid(),
        data: { text: 'Show more' },
        type: 'collapsable-text',
        ...styleObj,
        children: [
          {
            id: nanoid(),
            type: 'heading',
            data: {
              value: 'This is a new block',
              level: 2,
              settings: {},
            },
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
    blockNode: { data, children = [] },
    path,
    styleClasses,
  } = props;

  return (
    <div>
      <div className={styleClasses['button-container'] || '' + ' dme-w-button-container'}>
        <button
          className={styleClasses['button'] || '' + ' dme-w-button'}
          onClick={() => setExpanded(!expanded)}
        >
          {data.text}
          {expanded ? <ArrowDropUp /> : <ArrowDropDown />}
        </button>
      </div>
      <Collapse in={expanded}>
        <BlockListRender blockData={children} path={path} mode={props.mode} />
      </Collapse>
    </div>
  );
};
