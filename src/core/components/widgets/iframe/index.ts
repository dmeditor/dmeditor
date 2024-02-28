import { registerWidget } from '../';
import { IFrame, iFrameDefinition } from './IFrame';

export default () => {
  registerWidget(iFrameDefinition, IFrame);
};
