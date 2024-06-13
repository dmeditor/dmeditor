import { DMEData } from './../../types/dmeditor';
import { getEmbedConfigObject } from './../../utils/util';

export const isEmbedOwnSetting = (
  childBlock: DMEData.Block,
  relativePath: Array<number>,
  rootWidget: string,
) => {
  if (!childBlock.isEmbed) {
    return false;
  }

  const configObject = getEmbedConfigObject(rootWidget);
  if (!configObject || !configObject.hasOwnView) {
    return false;
  }

  const result = configObject.hasOwnView({
    relativePath: relativePath,
    blockData: childBlock,
  });
  return result;
};
