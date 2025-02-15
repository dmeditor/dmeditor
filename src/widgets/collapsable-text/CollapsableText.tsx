import { useState } from 'react';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { nanoid } from 'nanoid';

import { BlockListRender, dmeConfig, generalSettings, getCommonSettings, i18n } from '../..';
import type { DME, DMEData } from '../..';

interface CollapsableTextEntity {
  text: string;
  buttonAlign?: 'left' | 'center' | 'right';
  settings?: {
    general?: DMEData.GeneralSettingType;
  };
}

export const CollapsableTextDefiniation: DME.Widget = {
  category: 'interactive',
  name: i18n('Collapsable text', 'widget'),
  type: 'collapsable-text',
  icon: 'collapsable-text',
  widgetType: 'mixed',
  settings: [
    {
      name: 'Text',
      property: '.text',
      settingComponent: 'input',
    },
    {
      name: 'Button align',
      property: '.buttonAlign',
      identifier: 'collapsable-text-button-align',
      category: 'style',
      settingComponent: 'align',
    },
  ],
  events: {
    createBlock: () => {
      return {
        data: { text: 'Show more' },
        type: 'collapsable-text',
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
      };
    },
    updateData: () => {},
  },
};

export const CollapsableText = (props: DME.WidgetRenderProps<CollapsableTextEntity>) => {
  const [expanded, setExpanded] = useState(false);
  const {
    blockNode: { data, children = [] },
    path,
    styleClasses,
  } = props;

  return (
    <div>
      <div className={styleClasses['button-container'] || '' + ' dme-w-button-container'}>
        <div style={data.buttonAlign ? { textAlign: data.buttonAlign } : {}}>
          <button
            className={styleClasses['button'] || '' + ' dme-w-button'}
            onClick={() => setExpanded(!expanded)}
          >
            {data.text}
            {expanded ? (
              <ArrowDropUp style={{ verticalAlign: 'middle' }} />
            ) : (
              <ArrowDropDown style={{ verticalAlign: 'middle' }} />
            )}
          </button>
        </div>
      </div>
      <Collapse in={expanded}>
        <div style={{ padding: '0px 5px 10px 5px' }}>
          <BlockListRender blockData={children} path={path} mode={props.mode} />
        </div>
      </Collapse>
    </div>
  );
};
