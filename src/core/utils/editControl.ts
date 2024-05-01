import { dmeConfig } from '../config';
import { DMEData } from '../types';

//verifification. true means can set everything, false means be controlled(need to editControl code for detail)
const canEditControl = (blockData: DMEData.Block) => {
  if (!dmeConfig.callbacks.canEditControl) {
    return true;
  }

  return dmeConfig.callbacks.canEditControl(blockData);
};

const editControlEnabled = () => {
  return dmeConfig.editor.enableEditControl;
};

export { canEditControl, editControlEnabled };
