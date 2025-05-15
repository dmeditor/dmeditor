import type { DME, DMEData } from '../types';
// import { simpleCloneDeep } from '../utils';
import type { Store } from './store/types';

export type LayoutMode = 'pc' | 'mobile' | 'tablet';
// const getDefaultOptions = (): {
//   layoutMode: LayoutMode;
// } => {
//   return {
//     layoutMode: 'pc',
//   };
// };

function createDMEditor() {
  // const defaultConfig = simpleCloneDeep(getDefaultOptions());
  let recentColors: string[] = [];

  if (typeof window !== 'undefined' && window.localStorage) {
    const colors = window.localStorage.getItem('recentColors');
    if (colors) {
      recentColors = JSON.parse(colors);
    }
  }

  return {
    selected: {
      blockId: '',
      blockIndex: -Infinity,
      currentListPath: [] as Array<number>,
    },
    // editorConfig: {
    //   cssCode: '',
    //   layoutMode: 'pc',
    // },
    storage: [] as DMEData.BlockList,
    page: { title: 'New page' },
    mode: 'edit' as DME.Mode,
    hoverPath: undefined,
    addBlockData: undefined,
    recentColors,
  };
}

export { createDMEditor };
