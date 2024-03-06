import { getWidgetServerLoad } from '../components/widgets';
import { iterateBlockList } from '../main/store/helper';
import { DMEData } from '../types/dmeditor';

const serverLoad = async (data: DMEData.BlockList, serverParameters: any) => {
  let proms: Array<Promise<any>> = [];
  iterateBlockList(data, (blockItem: DMEData.Block) => {
    const blockType = blockItem.type;
    const func = getWidgetServerLoad(blockType);
    if (func) {
      proms.push(func(blockItem, serverParameters));
    }
  });

  try {
    await Promise.all(proms);
    return data;
  } catch (error) {
    console.error(error);
    throw 'Error in DM Editor server load';
  }
};

export { serverLoad };
