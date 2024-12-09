import { ExpandMoreOutlined } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary, Accordion as MUIAccordion } from '@mui/material';

import { BlockListRender, DME } from '../..';
import { getAllowedTypes, isNull } from '../../core/utils';
import { AccordtionChildType, EntityAccordion } from './entity';
import { useAccordionStore } from './store';

const Accordion = (props: DME.WidgetRenderProps<EntityAccordion, AccordtionChildType[]>) => {
  const {
    blockNode: { children: accordionList = [], type },
    styleClasses,
  } = props;
  const { activeKey, setActiveKey } = useAccordionStore();
  const handleSelect = (key: string | number) => {
    if (isNull(key)) return;
    setActiveKey(key);
  };
  return (
    <div>
      {accordionList.map((accordion, index: number) => (
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
              allowedTypes={props.blockNode.allowedTypes}
            />
          </AccordionDetails>
        </MUIAccordion>
      ))}
    </div>
  );
};

export default Accordion;
