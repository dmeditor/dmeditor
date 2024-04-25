import React, { useEffect, useRef, useState } from 'react';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary, Accordion as MUIAccordion } from '@mui/material';
import { BlockListRender } from 'dmeditor/main/renderer';
import { isNull } from 'dmeditor/utils';

import { getAllowedTypes } from '..';
import { useAccordionStore } from './store';

const Accordion = (props: any) => {
  const {
    blockNode: { children: accordionList = [], type },
    rootClasses,
    styleClasses,
  } = props;
  const { activeKey, setActiveKey } = useAccordionStore();
  const handleSelect = (key: string | number) => {
    if (isNull(key)) return;
    setActiveKey(key);
  };
  return accordionList.map((accordion: any, index: number) => {
    return (
      <MUIAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlined />}
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
        >
          {`${accordion?.meta?.title}` ?? ''}
        </AccordionSummary>
        <AccordionDetails>
          <BlockListRender
            mode={props.mode}
            blockData={accordion.children || []}
            path={props.path.concat(index)}
            // direction={direction}
            onSelect={handleSelect}
            allowedTypes={getAllowedTypes(type)}
          />
        </AccordionDetails>
      </MUIAccordion>
    );
  });
};

export default Accordion;
