import { iterateBlockList } from '../main/store/helper';
import { DME, DMEData } from '../types/dmeditor';

//widget serverSideLoad map
const serverSideLoadMap: { [widget: string]: DME.ServerSideLoadFunction } = {};

function registerServerSideLoad(widgetName: string, serverLoad: DME.ServerSideLoadFunction) {
  if (serverSideLoadMap[widgetName]) {
    console.warn(`Server load ${widgetName} is already registered.`);
    return;
  }
  serverSideLoadMap[widgetName] = serverLoad;
}

function getWidgetServerSideLoad(widgetName: string) {
  return serverSideLoadMap[widgetName];
}

const dmeServerSideLoad = async (
  data: DMEData.BlockList,
  serverParameters: { query: Record<string, any> } & any,
) => {
  let validBlocks: Array<{
    func: DME.ServerSideLoadFunction;
    id: string;
    block: DMEData.Block;
    type: string;
    value?: string;
    dependency?: string;
  }> = [];
  iterateBlockList(data, (blockItem: DMEData.Block) => {
    const blockType = blockItem.type;
    const func = getWidgetServerSideLoad(blockType);
    if (func) {
      validBlocks.push({
        func: func,
        block: blockItem,
        id: blockItem.id,
        type: blockItem.type,
        dependency: blockItem.dependency?.id,
      });
    }
  });

  const levels: Array<Array<string>> = [];
  const maxLevel = 6; //max 6 levels
  for (let i = 0; i < maxLevel; i++) {
    const levelArray: Array<string> = [];
    if (i === 0) {
      for (const item of validBlocks) {
        if (!item.dependency) {
          levelArray.push(item.id);
        }
      }
    } else {
      const parentLevel = levels[i - 1];
      if (parentLevel && parentLevel.length > 0) {
        for (const item of validBlocks) {
          if (item.dependency && parentLevel.includes(item.dependency)) {
            levelArray.push(item.id);
          }
        }
      }
    }
    if (levelArray.length > 0) {
      levels.push(levelArray);
    }
  }

  const dependencyValues: Record<string, any> = {};
  for (const levelIds of levels) {
    const levleList = validBlocks.filter((item) => levelIds.includes(item.id));
    await Promise.all(
      levleList.map((p, index) =>
        p
          .func(
            p.block,
            p.dependency
              ? { ...serverParameters, dependencyValue: dependencyValues[p.dependency] }
              : serverParameters,
          )
          .then((widgetResult: any) => {
            if (widgetResult) {
              dependencyValues[p.id] = widgetResult.value;
            }
          })
          .catch((e) => {
            throw `Error in server side loading. Type: ${p.type} id: ${p.id}, detail: ${e}`;
          }),
      ),
    );
  }
  return data;
};

export { registerServerSideLoad, dmeServerSideLoad };
