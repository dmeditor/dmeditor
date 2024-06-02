import * as React from 'react';
import { nanoid } from 'nanoid';

import {
  DMEData,
  DMEditor,
  DMEditorView,
  dmeServerSideLoad,
  initLanguage,
  registerDefaultWidgets,
  registerWidgetStyleOption,
  // registerTheme,
  setDMEditorCallback,
  setDMEditorConfig,
} from '../../src';
import { BrowseImage, BrowseLink } from './callbacks';
import { EditImage } from './EditImage';
import { registerStyles } from './registerStyles';
import registerSampleWidget from './SampleWidget';

initLanguage('nor-NO');

registerDefaultWidgets();
registerSampleWidget();
registerStyles();

setDMEditorConfig({
  general: {
    projectStyles: {
      default: `background: white`,
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
    ui: {
      'bg-editarea': '#666666',
    },
  },
  widgets: {
    heading: { defaultStyle: { _: 'big-space' } },
  },
  plugins: {
    imageHandlers: [EditImage],
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

registerWidgetStyleOption('tabs', [
  {
    identifier: 'default',
    name: 'Default',
    cssClasses: {
      root: 'bg-white',
    },
    cssStyle: `     
      .dme-w-nav-item{
        padding: 10px 20px;
        background: #f0f0f0;
        cursor: pointer;      
        border-right:none;
        border-top: none;

        &:hover{
          background: #cccccc;
        }
      }

      .dme-w-nav-item:not(:first-child){
        border-left: 1px solid #ccc;
      }
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
});

const { useRef, useEffect } = React;

const App = () => {
  const editorRef = useRef(null);
  // const [editor] = useEditor()
  const data = [
    {
      id: `widget-${nanoid()}`,
      style: { _: 'big-space' },
      data: {
        value: 'This is a heading',
        level: 2,
        settings: {
          align: 'left',
          // value: '',
        },
      },
      type: 'heading',
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
              width: 127,
              height: 71,
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
    // editorRef.current.setDesingerJson(jsonString(data))
    editorRef.current?.setEditorJson(data);
    editorRef.current?.setPageSettings([
      { identifier: 'cover_image', name: 'Cover image', type: 'image' },
      { identifier: 'summary', name: 'Summary', type: 'richtext' },
      { identifier: 'meta_key', name: 'Meta key', type: 'text' },
      { identifier: 'meta_description', name: 'Meta description', type: 'multitext' },
    ]);
    editorRef.current?.setPageData({ title: 'New page', theme: 'red', meta_key: 'test key' });
    editorRef.current?.onSave((data) => {
      console.log(data);
      window.alert('Saved');
    });
    editorRef.current?.onCancel((data) => {
      window.alert('Cancel');
    });
  }, []);

  dmeServerSideLoad(data, null).then((d) => {
    console.log(d);
  });

  return <DMEditor ref={editorRef} />;
  // return <DMEditorView data={data} theme="blue" />;
};

export default App;
