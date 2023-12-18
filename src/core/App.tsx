import * as React from 'react';

import { DMEditor } from './main/DMEditor';

const { useState, useRef, useEffect } = React;

const App = () => {
  const editorRef = useRef(null)
  useEffect(() => {
    console.log(editorRef.current)
  })
  const [data, setData] = useState([
    { type: 'heading', data: 'Description:', settings: { level: 3 }, id: 'agSg0CaGuF1' },
    {
      type: 'text',
      data: [{ type: 'paragraph', children: [{ text: 'This lap top has fastest CPU so far.' }] }],
      id: 'agSg0CaGuFe',
    },
    {
      type: 'collapsable_text',
      style: 'bold',
      data: {
        title: 'How CPU affects you',
        body: [
          {
            type: 'text',
            id: '2',
            data: [
              {
                type: 'paragraph',
                children: [{ text: 'CPU is the most important put in a computer...' }],
              },
            ],
          },
        ],
      },
      id: 'aZtOs7mHKCO',
    },
  ]);
  return <DMEditor data={data} ref={editorRef}/>;
};

export default App;
