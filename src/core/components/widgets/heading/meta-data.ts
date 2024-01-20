// import { widgetMetaData } from 'Components/types';

import { EntityBlock } from "Src/core/main/entity/entitity";

const HeadingMetaData = {
  alias: '',
  // ?category options: widget, layout, form, chart, advanced
  category: 'widget',
  // data: {
  // },
  icon: 'TextFormatOutlined',
  id: '',
  name: 'Heading',
  events: {
    onInput: () => void 0,
    onChange: () => void 0,
    onFocus: () => void 0,
    onBlur: () => void 0,
  },
  // style: {},
  //todo: props changed to settings, value & level can be upper
  props: {
    align: 'left',
    'background-color': '',
    color: '#000000',
    level: 2,
    'margin-top': 0,
    padding: 0,
    textColor: '#000000',
    value: '',
    width: 'auto',
  },
  placeholder: '',
  type: 'Heading',
};

export default HeadingMetaData;
