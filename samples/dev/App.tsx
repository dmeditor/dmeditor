import * as React from 'react';
import { nanoid } from 'nanoid';

import {
  DMEditor,
  dmeServerSideLoad,
  initLanguage,
  registerDefaultWidgets,
  registerWidgetStyleOption,
  // registerTheme,
  setDMEditorCallback,
  setDMEditorConfig,
} from '../../src/core';
import { BrowseImage, BrowseLink } from './callbacks';
import { EditImage } from './EditImage';
import registerSampleWidget from './SampleWidget';

initLanguage('nor-NO');

registerDefaultWidgets();
registerSampleWidget();

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

setDMEditorCallback({ browseImage: BrowseImage, browseLink: BrowseLink });

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
      id: `widget-${nanoid()}`,
      style: { _: 'big-space' },
      data: {
        value: 'This is a heading 2',
        level: 2,
        settings: {
          align: 'left',
        },
      },
      type: 'heading:gradient',
    },
    {
      id: `widget-${nanoid()}`,
      data: {
        value: 'This is a heading 2',
        level: 2,
        settings: {
          align: 'right',
          // value: '',
        },
      },
      type: 'heading',
    },
    {
      id: `widget-${nanoid()}`,
      data: {
        columns: 3,
      },
      type: 'grid',
      children: [
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 1 ',
            level: 2,
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 2',
            level: 2,
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          type: 'list',
          data: {},
          children: [
            {
              id: `widget-${nanoid()}`,
              data: {
                value: 'This is a heading 1 in List ',
                level: 2,
              },
              type: 'heading',
            },
            {
              id: `widget-${nanoid()}`,
              data: {
                value: 'This is a heading 2 in List',
                level: 2,
              },
              type: 'heading',
            },
            {
              id: `widget-${nanoid()}`,
              data: {
                value: 'This is a heading 3 in List',
                level: 2,
              },
              type: 'heading',
            },
          ],
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 3',
            level: 2,
          },
          type: 'heading',
        },
      ],
    },
    {
      id: `widget-${nanoid()}`,
      data: {
        value: 'This is a heading 3',
        level: 2,
      },
      type: 'heading:gradient',
    },
    {
      id: `widget-${nanoid()}`,
      type: 'list',
      data: {
        direction: 'horizontal',
      },
      children: [
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 1 in List ',
            level: 2,
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 2 in List',
            level: 2,
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 3 in List',
            level: 2,
          },
          type: 'heading',
        },
      ],
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
