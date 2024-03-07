import * as React from 'react';
import { registerTheme } from 'dmeditor/components/page';
import { DMEditor } from 'dmeditor/index';
import { nanoid } from 'nanoid';

import registerSampleWidget from './SampleWidget';

registerSampleWidget();
registerTheme({
  identifier: 'red',
  name: 'Red',
  cssStyle: `
    --project-main-color: red;
    --project-main-bg-color: #fbadad;

    /*background: var(--project-main-bg-color);  */

    /*todo: use css variable*/
  `,
});
registerTheme({
  identifier: 'blue',
  name: 'Blue',
  cssStyle: `
    --project-main-color: blue;
    --project-main-bg-color: #e0e0ff;
    /*background: var(--project-main-bg-color);  */
  `,
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
            settings: {},
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 2',
            level: 2,
            settings: {},
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
                settings: {},
              },
              type: 'heading',
            },
            {
              id: `widget-${nanoid()}`,
              data: {
                value: 'This is a heading 2 in List',
                level: 2,
                settings: {},
              },
              type: 'heading',
            },
            {
              id: `widget-${nanoid()}`,
              data: {
                value: 'This is a heading 3 in List',
                level: 2,
                settings: {},
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
            settings: {},
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
        settings: {},
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
            settings: {},
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 2 in List',
            level: 2,
            settings: {},
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 3 in List',
            level: 2,
            settings: {},
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
  }, []);

  return <DMEditor ref={editorRef} />;
};

export default App;
