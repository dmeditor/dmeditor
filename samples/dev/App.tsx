import * as React from 'react';
import { nanoid } from 'nanoid';

import {
  dmeConfig,
  DMEData,
  DMEditor,
  DMEditorView,
  dmeServerSideLoad,
  getStyleConfig,
  initLanguage,
  iterateBlockList,
  registerDefaultWidgets,
  registerWidgetStyleOption,
  // registerTheme,
  setDMEditorCallback,
  setDMEditorConfig,
  StyleSettingsType,
} from '../../src';
import { DMEditorRefType } from '../../src/core/main/designer/DMEditor';
import { BrowseImage, BrowseLink } from './callbacks';
import { DataSource, fetchInClient } from './callbacks/DataSource';
import { defaultStyles } from './defaultStyles';
import { EditImage } from './EditImage';
import { registerStyles } from './registerStyles';
import registerSampleWidget from './SampleWidget';
import { getSavedBlocks, SaveBlock } from './SaveBlock';
import { styleSettings } from './styleSettings';

registerDefaultWidgets();
registerSampleWidget();
registerStyles();

const defaultStyleConfig = {};
for (const widget of Object.keys(defaultStyles)) {
  registerWidgetStyleOption(widget, [
    { identifier: '_default', name: 'Default', ...defaultStyles[widget] },
  ]);
  defaultStyleConfig[widget] = { _: '_default' };
}

setDMEditorConfig({
  general: {
    projectStyles: {
      default: `background: white;
      
      `,
    },
    themes: [
      {
        identifier: 'red',
        name: 'Red',
        cssStyle: `
        --project-main-color: red;
        --project-main-bg-color: #fbadad;
    
        /*background: var(--project-main-bg-color);  */
    
        /*todo: use css variable*/
       
      `,
      },
      {
        identifier: 'blue',
        name: 'Blue',
        cssStyle: `
        --project-main-color: blue;
        --project-main-bg-color: #e0e0ff;
        /*background: var(--project-main-bg-color);  */
      `,
      },
    ],
  },
  editor: {
    favouriteWidgets: ['text', 'button', 'hero-text:image'],
    enableEditControl: true,
    // disabledStyleSettings: {
    //   '*': ['container-border-width', 'container-border-color', 'container-border-radius'],
    // },
    zIndex: 100,
    defaultStyle: {
      ...defaultStyleConfig,
      heading: { _: 'theme' },
      button: { _: 'project-primary' },
    },
    colors: {
      text: [{ color: '#000000' }, { color: '#cccccc' }, { color: '#ffffff' }],
      border: [
        { color: '#000000' },
        { color: '#333333' },
        { color: '#666666' },
        { color: '#999999' },
        { color: '#cccccc' },
        { color: '#ffffff' },
      ],
      background: [
        { color: '#ffffff', name: 'White' },
        { color: '#cccccc', name: 'Light white' },
        { color: '#dddddd' },
        { color: '#ffe6de' },
        { color: '#666666' },
        { color: '#034323' },
        { color: '#433803' },
        { color: '#430318' },
        { color: '#432603' },
      ],
    },
    characters: ['♠️', '❤️', '♣️', '♦️', '😃', '😁', '😆', '😅', '🙂', '😇'],
    ui: {
      // 'bg-editarea': '#666666',
    },
    getAddingSettings: (context) => {
      console.log('adding context', context);
      const rootBlock = context.root;
      let allowedTypes: Array<string> | undefined;
      if (rootBlock) {
        if (rootBlock.type === 'hero-text') {
          allowedTypes = ['heading', 'text', 'button'];
        }
      }
      return { allowedTypes: allowedTypes };
    },
    configStyleSettings: (current, context, parentIsList): StyleSettingsType => {
      return getStyleConfig({ current, context, parentIsList }, styleSettings);
    },
  },
  widgets: {
    heading: { defaultStyle: { _: 'big-space' } },
    'content-view': {
      views: [{ label: 'Block', value: 'block' }],
      render: (props: { data: any; view: string }) => {
        return (
          <div>
            ID: {props.data?.id}, Name: {props.data?.name}, View: {props.view}
          </div>
        );
      },
    },
    form: {
      submit: async (data, extra) => {
        console.log(data);
        console.log(extra);
        return { success: true };
      },
    },
  },
  dataSource: { edit: DataSource, fetchInClient: fetchInClient },
  plugins: {
    imageHandlers: [EditImage],
    blockSettingActions: [SaveBlock],
  },
});

registerWidgetStyleOption('text', [
  {
    identifier: 'article-summary',
    name: 'Article summary',
    cssStyle: `
    font-weight: bold;
    padding: 5px 10px;
`,
  },
]);

const canEditControl = (blockData) => {
  return true;
};

setDMEditorCallback({
  browseImage: BrowseImage,
  browseLink: BrowseLink,
  canEditControl: canEditControl,
  getSavedBlocks: getSavedBlocks,
});

const { useRef, useEffect } = React;

const App = () => {
  const editorRef = useRef<DMEditorRefType>(null);
  // const [editor] = useEditor()
  const data = [
    {
      id: 'widget-KLBtVx4WEL3mYANB9r6EL',
      style: {
        _: 'big-space',
      },
      data: {
        value: 'This is a heading',
        level: 2,
        settings: {
          align: 'left',
          general: {
            padding: 80,
          },
        },
      },
      type: 'heading',
    },
    {
      type: 'content-view',
      data: {
        view: 'block',
        dataSource: {
          type: 'dependency',
          sourceData: {
            id: 'WIy_IFJ9F1YejbU4ej5bo',
            type: 'menu',
          },
        },
        settings: {
          general: {},
        },
      },
      id: 'RM65dm9WFxy7K-BXn7YY3',
      dependency: {
        id: 'WIy_IFJ9F1YejbU4ej5bo',
        type: 'menu',
      },
    },
    {
      type: 'menu',
      data: {
        menuList: [
          {
            text: 'Menu1',
            identifier: 'menu1',
            value: '1',
          },
          {
            text: 'Menu2',
            identifier: 'menu2',
            value: '2',
          },
        ],
        settings: {
          general: {
            identifier: 'menu',
          },
        },
      },
      style: {
        _: '_default',
      },
      id: 'WIy_IFJ9F1YejbU4ej5bo',
    },

    {
      id: 'N-LAQWihvfZv1SmUAPoQx',
      type: 'text',
      data: {
        value: [
          {
            type: 'paragraph',
            children: [
              {
                text: '',
              },
            ],
          },
          {
            type: 'image',
            url: 'https://zeekrlife-oss.zeekrlife.com/frontend/atom/atom_json/JSON-2c293ed22f16f3602f139511e8d9479b/zeekr001_kv_2024-32788be256e0c4bcad0fced53952a5ec.png',
            children: [
              {
                text: '',
              },
            ],
            setting: {
              width: 227,
              height: 140,
              scale: 1.79,
            },
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '',
              },
            ],
          },
        ],
      },
    },
  ];

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.setData(data);
      editor.setPageSettings([
        { identifier: 'cover_image', name: 'Cover image', type: 'image' },
        { identifier: 'in_menu', name: 'In menu', type: 'checkbox' },
        { identifier: 'summary', name: 'Summary', type: 'richtext' },
        {
          identifier: 'dropdown_test',
          name: 'Dropdown',
          type: 'dropdown',
          parameters: { list: [{ text: 'test', value: 'test1' }] },
        },
        { identifier: 'meta_key', name: 'Meta key', type: 'text' },
        { identifier: 'meta_description', name: 'Meta description', type: 'multitext' },
      ]);
      editor.setPageData({ title: 'New page', in_menu: false, theme: 'red', meta_key: 'test key' });
    }
  }, []);

  return (
    <div>
      <DMEditor
        ref={editorRef}
        onSave={(data) => {
          console.log(data);
          window.alert('Saved');
        }}
        onChange={(data) => {
          console.log('changed');
          console.log(data.data, data.page);
        }}
        onCancel={() => {
          window.alert('Cancel');
        }}
      />
    </div>
  );
  // return <DMEditorView data={data} theme="blue" />;
};

export default App;
