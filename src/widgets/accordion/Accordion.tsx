import { ExpandMoreOutlined } from '@mui/icons-material';
import { AccordionDetails, AccordionSummary, Accordion as MUIAccordion } from '@mui/material';

import { BlockListRender } from '../..';
import { getAllowedTypes, isNull } from '../../core/utils';
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
  return (
    <div>
      {accordionList.map((accordion: any, index: number) => (
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
      ))}
    </div>
  );
};

export default Accordion;
