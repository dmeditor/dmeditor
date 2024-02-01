import * as React from 'react';
import { nanoid } from 'nanoid';

import { DMEditor } from '../../src/core/main/designer/DMEditor';
import loaderWidget from './local-loader/loader';
loaderWidget();

const { useState, useRef, useEffect } = React;

const App = () => {
  const editorRef = useRef(null);
  // const [editor] = useEditor()
  const data = [
    {
      id: `widget-${nanoid()}`,
      data: {
        value: 'This is a heading',
        level: 2,
        settings: {
          align: 'left'
          // value: '',
        },
      },
      type: 'heading',
    },
    {
      id: `widget-${nanoid()}`,
      data: {
        value: 'This is a heading 2',
        level: 2,
        settings: {
          align: 'right'
          // value: '',
        },
      },
      type: 'heading',
    },
  ];
  // {
  //   type: 'text',
  //   data: [{ type: 'paragraph', children: [{ text: 'This lap top has fastest CPU so far.' }] }],
  //   id: 'agSg0CaGuFe',
  // },
  // {
  //   type: 'collapsable_text',
  //   style: 'bold',
  //   data: {
  //     title: 'How CPU affects you',
  //     body: [
  //       {
  //         type: 'text',
  //         id: '2',
  //         data: [
  //           {
  //             type: 'paragraph',
  //             children: [{ text: 'CPU is the most important put in a computer...' }],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   id: 'aZtOs7mHKCO',
  // },
  useEffect(() => {
    // editorRef.current.setDesingerJson(jsonString(data))
    editorRef.current?.setEditorJson(data);
  }, []);

  return <DMEditor ref={editorRef} />;
};

export default App;
