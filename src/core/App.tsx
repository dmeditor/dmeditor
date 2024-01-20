import * as React from 'react';
import { nanoid } from 'nanoid';

import { DMEditor } from './main/designer/DMEditor';
import { EntityHeadingBlock } from './main/entity/entitity';

const { useState, useRef, useEffect } = React;

const App = () => {
  const editorRef = useRef(null);
  // const [editor] = useEditor()
  const data = [
    {
      id: `widget-${nanoid()}`,
      level: 5,
      value: 'This is a heading',
      settings:{
        
      },
      type: 'Heading',
      children:[{
          id: `widget-${nanoid()}`,
          level: 5,
          value: 'This is a heading child',
          type: 'Heading',
          props:{},
        }
      ],
    } as EntityHeadingBlock,   
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
