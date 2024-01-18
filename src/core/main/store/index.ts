import type { ReactNode } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createDMEditor } from '..';
import emitter from 'Core/utils/event';
import type { DMEditor } from 'Src/core/components/types/blocktype';
import { properties } from 'Src/core/components/widgets';
import { isStrictlyInfinity } from 'Src/core/utils';

type Store = {
  designer: any;
};

type Actions = {
  addWidget: (widget: ReactNode) => void;
  clearWidgets: () => void;
  clearSelected: () => void;
  loadJsonSchema: (jsonSchema: { widgets: ReactNode[] }) => void;
  getSelectedWidget: (index: number) => DMEditor.Block | undefined;
  removeWidget: (widget: ReactNode) => void;
  setSelected: (widget: ReactNode) => void;
  updateWidgets: (widgets: DMEditor.Block[]) => void;
  updateSelectedWidgetIndex: (index: number) => void;
  updateSelectedBlockProps: (propName: string, propValue: string | number) => void;
  toggleProperty: (status: boolean) => void;
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
    designer: createDMEditor(),
    addWidget: (widget: ReactNode) =>
      set((state) => {
        state.designer.widgets.push(widget);
      }),
    clearWidgets: () => {
      set((state) => {
        state.designer.selectedWidget = null;
        // state.designer.selectedWidgetIndex = -1;
        state.designer.selectedWidgetIndex = -Infinity;
        state.designer.widgets = [];
      });
    },
    clearSelected: () => {
      set((state) => {
        state.designer.selectedWidget = null;
        state.designer.selectedWidgetIndex = -Infinity;
      });
    },
    loadJsonSchema: (jsonSchema: { widgets: ReactNode[] }) => {
      set((state) => {
        let flag = false;
        if (!!jsonSchema && !!jsonSchema.widgets) {
          state.designer.widgets = jsonSchema.widgets;
          flag = true;
        }
        if (flag) {
          emitter.emit('loadJsonSchema', jsonSchema);
        }
        return flag;
      });
    },
    getSelectedWidget: (index: number) => {
      const state = get();
      if (isStrictlyInfinity(index) || index < 0 || state.designer.widgets.length <= index) {
        state.clearSelected();
        return;
      }
      if (!state.designer.widgets[index]) {
        state.clearSelected();
        return;
      }
      return state.designer.widgets[index];
    },
    removeWidget: (widget: ReactNode) =>
      set((state) => {
        state.designer.widgets = state.designer.widgets.filter((w) => w !== widget);
      }),
    setSelected: (widget: ReactNode) => {
      set((state) => {
        if (!widget) {
          state.clearSelected();
          return;
        }
        // state.designer.selectedWidgetIndex = selected;
        state.designer.selectedWidget = widget;
      });
    },
    updateWidgets: (blocks: DMEditor.Block[]) => {
      set((state) => {
        const propertiesMap = properties.reduce((acc, cur) => {
          if (!cur || !cur.type) {
            return acc;
          }
          acc[cur.type] = cur;
          return acc;
        }, {});
        state.designer.widgets = blocks.map((block) => {
          if (!block || !block.type) {
            return block;
          }
          if (!propertiesMap[block.type]) {
            return block;
          } else {
            return {
              ...block,
              props: {
                ...propertiesMap[block.type],
                ...block.props,
              },
            };
          }
        });
      });
    },
    updateSelectedWidgetIndex: (index: number) => {
      set((state) => {
        state.designer.selectedWidgetIndex = index;
      });
    },
    updateSelectedBlockProps: (propName: string, propValue: string | number) => {
      set((state) => {
        if (!propName) {
          console.error('Invalid propName', propName);
          return;
        }

        const block = state.getSelectedWidget(state.designer.selectedWidgetIndex);
        if (!block) {
          console.error('Block not found');
          return;
        }

        if (!block['props'][propName]) {
          console.error(`Property ${propName} not found`);
          return;
        }

        state.designer.widgets[state.designer.selectedWidgetIndex].props = {
          ...block.props,
          [propName]: propValue,
        };
      });
    },
    toggleProperty: (status) => set(() => ({ status })),
  })),
);

export { useEditorStore };
