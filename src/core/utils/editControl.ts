import { dmeConfig } from '../config';
import { DMEData } from '../types';

const canEditControl = (blockData: DMEData.Block) => {
  if (!dmeConfig.callbacks.canEditControl) {
    return true;
  } else {
    return dmeConfig.callbacks.canEditControl(blockData);
  }
};

export { canEditControl };
