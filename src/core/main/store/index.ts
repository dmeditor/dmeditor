import type { ReactNode } from 'react';
import { isPlainObject } from 'lodash';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createDMEditor } from '..';
import { GetDataByPath, iteratePath } from './helper';
import type { DMEData } from 'Core/types';
import emitter from 'Core/utils/event';
import { properties } from 'Src/core/components/widgets';
import { isEmptyString, isKeyInObject, isStrictlyInfinity } from 'Src/core/utils';

export type AddBlockPosition = 'before' | 'after';

export interface AddBlockParameters {
  index: number,
  position: AddBlockPosition,
  context: Array<number>;
  status: 'started'|'done';
}

type Store = {
  selected: {
    blockId: string; //unique id
    blockIndex: number; //-Infinity if it's not selected
    //current blocklist path as context. Use getCurrentList to get current list data
    //eg. [0,1] means first on root level, second on second level
    currentListPath: Array<number>;
  };
  addBlockData?: AddBlockParameters;
  storage: DMEData.BlockList; //data layer
};

type Actions = {
  startAddBlock: (context:Array<number>, index: number, type: AddBlockPosition) => void;
  cancelAdding: () => void;
  addBlock: (data: DMEData.Block) => void;
  clearWidgets: () => void;
  clearSelected: () => void;
  loadJsonSchema: (jsonSchema: { widgets: ReactNode[] }) => void;
  getSelectedBlock: <T=DMEData.Block<DMEData.DefaultDataType>>() => DMEData.Block<T> | undefined;
  getBlock: <T=DMEData.Block<DMEData.DefaultDataType>>(index:number) => DMEData.Block<T> | undefined;
  removeBlock: (widget: ReactNode) => void;
  removeByPath: (path: Array<number>)=>void;
  setSelected: (widget: ReactNode) => void;
  setStorage: (data: DMEData.Block[]) => void;
  updateSelectedBlockIndex: (pathArray: Array<number>, index: number) => void;
  getCurrentList: () => DMEData.BlockList|null;
  getParents: () => Array<DMEData.Block>; //get parent Block from top to down, based on currentListPath
  updateSelectedBlock:<Type=DMEData.DefaultDataType>(callback: (blockData: Type)=>void)=>void;
  updateSelectedBlockProps: (propName: string, propValue: string | number) => void;
  updateSelectedBlockStyle:(value:string, styleIdentifier:string)=>void;
  toggleProperty: (status: boolean) => void;
  isSelected: () => boolean;
};

// const useEditorStore = create<Store & Actions>((set) => {
//   // toggleProperty: (status) => set(() => ({ status })),
//   const initialState = createDMEditor();
//   return {
//     ...initialState,
//     // toggleProperty: (status) => set(() => ({ status })),
//   };
// });

const useEditorStore = create<Store & Actions>()(
  immer((set, get) => ({
    ...createDMEditor(),
    startAddBlock: (context: Array<number>, index: number, position: AddBlockPosition) =>
      set((state) => {
        state.addBlockData = {context, index, position, status:'started'} 
      }),
    addBlock: (data: DMEData.Block) =>
      set((state) => {
        if(!state.addBlockData){
          return;
        }        
        const {index, position, context} = state.addBlockData;
        if (index == -Infinity) {
          return;
        }       
        const listData = GetDataByPath(state.storage, context||[]);
        let newPosition: number = -Infinity;
        if( listData.length === 0 ){
          listData.push(data);
          newPosition = 0;
        }else{
          if (index <= listData.length -1 && state.addBlockData.position) {
            if (position === 'before' ) {
              listData.splice(index, 0, data);
              newPosition = index;
            } else if (position === 'after') {
                listData.splice(index + 1, 0, data);
                newPosition = index + 1;
            }else{
              console.warn("Invalid paraemter of adding. Ignored", index, position);
              return;
            }
          }        

          //update to new block
          state.selected.blockIndex = newPosition;
          state.selected.currentListPath = context;

          state.addBlockData.status = 'done';
        }
      }),
    cancelAdding: () =>
      set((state) => {
        if( state.addBlockData ){
          const context = state.addBlockData.context;
          const parentList = GetDataByPath(state.storage, context);
          if(context.length>0 && parentList && parentList.length ===0){
            //todo: remove
            //  state.removeByPath(context);

            const parentContext = context.slice(0, context.length-1);
            const list = GetDataByPath(state.storage, parentContext)
            const parentIndex = context[context.length-1];
            list.splice(parentIndex, 1);
          }
          state.addBlockData = undefined;
        }
      }),    
    clearWidgets: () => {
      set((state) => {
        // state.designer.selectedBlockIndex = -1;
        state.selected.blockIndex = -Infinity;
        state.storage = [];
      });
    },
    getCurrentList: (): DMEData.BlockList|null => {
      const state = get();
      const currentPath = state.selected.currentListPath;
      return GetDataByPath(state.storage, currentPath)
    },
    getParents: (): Array<DMEData.Block> => {
      const state = get();
      const result: Array<DMEData.Block> = [];
      iteratePath(state.selected.currentListPath, state.storage, (item) => {
        result.push(item);
      });
      return result;
    },
    clearSelected: () => {
      set((state) => {
        state.selected.blockIndex = -Infinity;
      });
    },
    isSelected: (): boolean => {
      const state = get();
      return state.selected.blockIndex !== -Infinity;
    },
    loadJsonSchema: (jsonSchema: { widgets: ReactNode[] }) => {
      set((state) => {
        let flag = false;
        if (!!jsonSchema && !!jsonSchema.widgets) {
          state.storage = jsonSchema.widgets;
          flag = true;
        }
        if (flag) {
          emitter.emit('loadJsonSchema', jsonSchema);
        }
        return flag;
      });
    },
    getSelectedBlock: <T>() => {
      const state = get();
      const index = state.selected.blockIndex;
      return state.getBlock(index);
    },
    getBlock: <T>(index:number)=>{
      const state = get();
      const currentList = state.getCurrentList();
      if (isStrictlyInfinity(index) || index < 0 || currentList.length <= index) {
        state.clearSelected();
        return;
      }
      if (!currentList[index]) {
        state.clearSelected();
        return;
      }
      return state.storage[index] as (DMEData.Block<T>);
    },
    removeByPath: (path:Array<number>)=>{
      set((state)=>{
        if(path.length===0)return

        const parentPath = path.length < 2?[]:path.slice(0, path.length-2);
        const index = path[path.length-1];
        const list = GetDataByPath(state.storage,parentPath);
        if(!list||list.length === 0){
          console.warn('Parent data not found in path', path);
          return;
        }
        list.splice(index, 1);
      })
    },
    removeBlock: (block: ReactNode) =>
      set((state) => {
        state.storage = state.storage.filter((w) => w !== widget);
      }),
    setSelected: (block: ReactNode) => {
      set((state) => {
        if (!block) {
          state.clearSelected();
          return;
        }
        // state.designer.selectedBlockIndex = selected;
        //state.designer.selectedBlock = block;
      });
    },
    setStorage: (blocks: DMEData.Block[]) => {
      set((state) => {
        const propertiesMap: {
          [index: string]: DMEData.Block;
        } = properties.reduce((acc, cur) => {
          if (!cur || !cur.type) {
            return acc;
          }
          acc[cur.type] = cur;
          return acc;
        }, {});
        state.storage = blocks.map((block) => {
          if (!block || !block.type) {
            return block;
          }
          if (!propertiesMap[block.type]) {
            return block;
          } else {
            const initBlockData = propertiesMap[block.type].events.createBlock();

            return {
              ...block,
              data: {
                ...initBlockData,
                ...block.data,
                settings: {
                  ...initBlockData.settings,
                  ...block.data.settings,
                },
              },
            };
          }
        });
        // state.selected.currentList = state.storage;
      });
    },
    updateSelectedBlockIndex: (pathArray: Array<number>, index: number) => {
      set((state) => {
        state.selected.blockIndex = index;
        if (state.selected.currentListPath.join() !== pathArray.join()) {
          // switch list context
          state.selected.currentListPath = pathArray;
        }
      });
    },
    updateSelectedBlock:<Type=DMEData.DefaultDataType>(callback: (blockData: Type)=>void)=>{
      set((state) => {       
        const data = state.storage[state.selected.blockIndex]['data'];
        callback(data as Type);
        // state.storage[state.selected.blockIndex]['data'] = data;
      })
    },
    updateSelectedBlockStyle: (value:string, styleIdentifier:string)=>{
      set((state) => {       
        const block = state.storage[state.selected.blockIndex];        
        if( !block.style ){
          block.style = {};
        }
        block.style[styleIdentifier] = value;
      })
    },
    updateSelectedBlockProps: (propName: string, propValue: string | number) => {
      set((state) => {
        if (!propName) {
          console.error('Invalid propName', propName);
          return;
        }

        const block = state.getSelectedBlock();
        if (!block) {
          console.error('Block not found');
          return;
        }

        //todo: check this from entity
        // if (!block['data']['settings'][propName]) {
        //   console.error(`Property ${propName} not found`);
        //   return;
        // }

        // todo: put settings to separate method
        const [propKey, realPropsName] = propName.split('.');
        // the property is in the root of the block
        if (isEmptyString(propKey)) {
          if (isPlainObject(state.storage[state.selected.blockIndex].data)) {
            state.storage[state.selected.blockIndex]['data'][realPropsName] = propValue;
          } else {
            console.warn('data is not an object');
          }
        } else if (propKey === 'settings') {
          if (isPlainObject(state.storage[state.selected.blockIndex].data)) {
            if (isKeyInObject('settings', state.storage[state.selected.blockIndex].data)) {
              state.storage[state.selected.blockIndex].data[propKey][realPropsName] = propValue;
            }
          } else {
            console.warn('settings is not an object');
          }
        } else {
          console.error(
            `Invalid propName: ${propName}, it should be "settings.${propName}" or ".${propName}"`,
          );
          // state.storage[state.selected.blockIndex].data = {
          //   ...state.storage[state.selected.blockIndex].data,
          //   settings: {
          //     ...(state.storage[state.selected.blockIndex].data.settings as any),
          //     [realPropsName]: propValue,
          //   },
          // };
        }
      });
    },
    toggleProperty: (status) => set(() => ({ status })),
  })),
);

export { useEditorStore };
