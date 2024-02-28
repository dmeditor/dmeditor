import { IFrame, iFrameDefinition } from './IFrame';
import { registerWidget } from 'Core/components/widgets';

export default () => {
  registerWidget(iFrameDefinition, IFrame);
};
