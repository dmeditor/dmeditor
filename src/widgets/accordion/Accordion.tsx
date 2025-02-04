import { useState } from 'react';
import { ExpandMoreOutlined } from '@mui/icons-material';
import {
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Accordion as MUIAccordion,
} from '@mui/material';

import { BlockListRender, DME } from '../..';
import { getAllowedTypes, isNull } from '../../core/utils';
import { AccordtionChildType, EntityAccordion } from './entity';
import { Accordion as AccordionStyle } from './styled';

const Accordion = (props: DME.WidgetRenderProps<EntityAccordion, AccordtionChildType[]>) => {
  const {
    blockNode: { children: accordionList = [], data, type },
    styleClasses,
  } = props;

  const [activeList, setActiveList] = useState<Array<number>>([]);

  const openClose = (index: number) => {
    if (data.multiOpen) {
      const i = activeList.findIndex((item) => item === index);
      if (i === -1) {
        setActiveList([...activeList, index]);
      } else {
        let newList = [...activeList];
        newList.splice(i, 1);
        setActiveList(newList);
      }
    } else {
      if (activeList.includes(index)) {
        setActiveList([]);
      } else {
        setActiveList([index]);
      }
    }
  };

  return (
    <AccordionStyle.Container className={(styleClasses['container'] || '') + ' dme-w-container'}>
      {accordionList.map((accordion, index: number) => {
        const isOpen = activeList.includes(index);

        return (
          <AccordionStyle.Item
            className={(styleClasses['item'] || '') + ' dme-w-item' + (isOpen ? ' dme-w-open' : '')}
          >
            <AccordionStyle.Summary
              open={isOpen}
              className={(styleClasses['summary'] || '') + ' dme-w-summary'}
              onClick={() => openClose(index)}
              iconPosition={data.settings?.iconOnLeft}
            >
              <AccordionStyle.Title className={(styleClasses['title'] || '') + ' dme-w-title'}>
                {accordion?.meta?.title || ''}
              </AccordionStyle.Title>
              <AccordionStyle.Icon
                open={isOpen}
                className={(styleClasses['icon-container'] || '') + ' dme-w-icon-container'}
              >
                {styleClasses['icon'] || <ExpandMoreOutlined />}
              </AccordionStyle.Icon>
            </AccordionStyle.Summary>
            <Collapse in={isOpen}>
              <AccordionStyle.Body className={(styleClasses['body'] || '') + ' dme-w-body'}>
                <BlockListRender
                  mode={props.mode}
                  blockData={accordion.children || []}
                  path={props.path.concat(index)}
                  allowedTypes={props.blockNode.allowedTypes}
                />
              </AccordionStyle.Body>
            </Collapse>
          </AccordionStyle.Item>
        );
      })}
    </AccordionStyle.Container>
  );
};

export default Accordion;
