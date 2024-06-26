import { iterateBlockList } from '../main/store/helper';
import { DMEData, ServerSideLoadFunction } from '../types/dmeditor';

//widget serverSideLoad map
const serverSideLoadMap: { [widget: string]: ServerSideLoadFunction } = {};

function registerServerSideLoad(widgetName: string, serverLoad: ServerSideLoadFunction) {
  if (serverSideLoadMap[widgetName]) {
    console.warn(`Server load ${widgetName} is already registered.`);
    return;
  }
  serverSideLoadMap[widgetName] = serverLoad;
}

function getWidgetServerSideLoad(widgetName: string) {
  return serverSideLoadMap[widgetName];
}

const dmeServerSideLoad = async (data: DMEData.BlockList, serverParameters: any) => {
  let proms: Array<Promise<any>> = [];
  iterateBlockList(data, (blockItem: DMEData.Block) => {
    const blockType = blockItem.type;
    const func = getWidgetServerSideLoad(blockType);
    if (func) {
      proms.push(func(blockItem, serverParameters));
    }
  });

  try {
    await Promise.all(proms);
    return data;
  } catch (error) {
    throw 'Error in DM Editor server load ' + error;
  }
};

export { registerServerSideLoad, dmeServerSideLoad };
