import type { DME, DMEData } from '../types';
import { simpleCloneDeep } from '../utils';

export type LayoutMode = 'pc' | 'mobile' | 'tablet';
const getDefaultOptions = (): {
  layoutMode: LayoutMode;
} => {
  return {
    layoutMode: 'pc',
  };
};

function createDMEditor() {
  const defaultConfig = simpleCloneDeep(getDefaultOptions());
  return {
    selected: {
      blockId: '',
      blockIndex: -Infinity,
      currentListPath: [] as Array<number>,
    },
    // activeWidget: null,
    editorConfig: {
      cssCode: '',
      layoutMode: 'pc',
    },
    steps: [],
    storage: [] as DMEData.BlockList,
    page: { title: 'New page' },
    mode: 'edit' as DME.Mode,
  };
}

export { createDMEditor };
