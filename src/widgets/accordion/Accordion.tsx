import { useState } from 'react';
import { ExpandMoreOutlined } from '@mui/icons-material';
import {
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Accordion as MUIAccordion,
} from '@mui/material';

import { BlockListRender, DME } from '../..';
import { getAllowedTypes, getWidgetStyleClass, isNull } from '../../core/utils';
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
    <AccordionStyle.Container className={getWidgetStyleClass(styleClasses, 'container')}>
      {accordionList.map((accordion, index: number) => {
        const isOpen = activeList.includes(index);

        return (
          <AccordionStyle.Item
            key={accordion.id || index}
            className={getWidgetStyleClass(styleClasses, 'item', isOpen ? 'dme-w-open' : '')}
          >
            <AccordionStyle.Summary
              open={isOpen}
              className={getWidgetStyleClass(styleClasses, 'summary')}
              onClick={() => openClose(index)}
              iconPosition={data.settings?.iconOnLeft}
            >
              <AccordionStyle.Title className={getWidgetStyleClass(styleClasses, 'title')}>
                {accordion?.meta?.title || ''}
              </AccordionStyle.Title>
              <AccordionStyle.Icon
                open={isOpen}
                className={getWidgetStyleClass(styleClasses, 'icon-container')}
              >
                {styleClasses['icon'] ? (
                  <i className={getWidgetStyleClass(styleClasses, 'icon')} />
                ) : (
                  <ExpandMoreOutlined className="dme-w-icon" />
                )}
              </AccordionStyle.Icon>
            </AccordionStyle.Summary>
            <Collapse in={isOpen}>
              <AccordionStyle.Body className={getWidgetStyleClass(styleClasses, 'body')}>
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
