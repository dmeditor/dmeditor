import * as React from 'react';
import { nanoid } from 'nanoid';

import registerSampleWidget from './SampleWidget';
import { DMEditor } from 'Src/core';

registerSampleWidget();

const { useRef, useEffect } = React;

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
          align: 'left',
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
            settings:{},
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 2',
            level: 2,
            settings:{},
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 3',
            level: 2,
            settings:{},
          },
          type: 'heading',
        }
      ],      
    },
    {
      id: `widget-${nanoid()}`,
      data: {
        value: 'This is a heading 3',
        level: 2,
        settings:{},
      },
      type: 'heading:gradient',
    },
    {
      id: `widget-${nanoid()}`,     
      type: 'list',
      data:{
        direction: 'horizontal'
      },
      children: [
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 1 in List ',
            level: 2,
            settings:{},
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 2 in List',
            level: 2,
            settings:{},
          },
          type: 'heading',
        },
        {
          id: `widget-${nanoid()}`,
          data: {
            value: 'This is a heading 3 in List',
            level: 2,
            settings:{},
          },
          type: 'heading',
        }
      ],      
    },
  ];
  useEffect(() => {
    // editorRef.current.setDesingerJson(jsonString(data))
    editorRef.current?.setEditorJson(data);
  }, []);

  return <DMEditor ref={editorRef} />;
};

export default App;
