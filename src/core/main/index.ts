import { DMEData } from 'dmeditor/types';

// import { config } from './config';
import { simpleCloneDeep } from '../utils';

// import { getBlockByID } from './dto/operations';

function initDefaultOptions() {}

function main() {
  // options = initDefaultOptions(options ?? {})
}

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

    // initEditor() {
    //   this.widgets = [];
    //   this.editorConfig = cloneDeep(defaultConfig);
    // },
    // changeViewMode(viewMode: ViewMode) {
    //   return (this.editorConfig.viewMode = viewMode);
    // },
    // addWidget(widget) {
    //   this.widgets.push(widget);
    // },
    // removeWidget(widget) {
    //   const index = this.widgets.indexOf(widget);
    //   if (index > -1) {
    //     this.widgets.splice(index, 1);
    //   }
    // },
  };
}

export { createDMEditor };
// const initApp = () =>
// export * from './core/main/DMEditor';
// export * from './BlockProperty';
// export * from './ToolDefinition';
// export * from './core/components/Block/Block';
// export * from './styles/StyleSettings';
