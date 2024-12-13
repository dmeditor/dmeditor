import * as React from 'react';
import { nanoid } from 'nanoid';

import {
  dmeConfig,
  DMEData,
  DMEditor,
  DMEditorView,
  dmeServerSideLoad,
  initLanguage,
  iterateBlockList,
  registerDefaultWidgets,
  registerWidgetStyleOption,
  // registerTheme,
  setDMEditorCallback,
  setDMEditorConfig,
} from '../../src';
import { DMEditorRefType } from '../../src/core/main/designer/DMEditor';
import { BrowseImage, BrowseLink } from './callbacks';
import { DataSource, fetchInClient } from './callbacks/DataSource';
import { defaultStyles } from './defaultStyles';
import { EditImage } from './EditImage';
import { registerStyles } from './registerStyles';
import registerSampleWidget from './SampleWidget';
import { getSavedBlocks, SaveBlock } from './SaveBlock';

registerDefaultWidgets();
registerSampleWidget();
registerStyles();

// initLanguage('chi-CN');

const testData = [
  {
    children: [
      {
        data: {
          animation: 'default',
          autoPlay: true,
          items: [
            {
              image: 'images/g/gbm/upload-695694939-adobestock_267112986.jpeg',
              link: 'https://www.google.com',
              title: '',
            },
            {
              image: 'images/j/jkt/upload-3580559075-klubbkveld_redigert.png',
              link: '',
            },
            {
              image: 'images/s/sgb/upload-2286589848-resized_20241116_134205_1732554285082.jpeg',
              link: '',
            },
            {
              image: 'images/s/svq/upload-1102802463-img_1997.jpeg',
              link: '',
            },
            {
              image: 'images/c/cqf/upload-1985171241-julebukk_hvit_bakgrunn_og_tekst.png',
              link: '',
            },
          ],
        },
        id: 'k8F_G6bgeuQpOefUVNtHR',
        isEmbed: true,
        style: {
          _: 'default',
        },
        type: 'carousel',
      },
      {
        data: {
          settings: {
            general: {},
          },
          value: [
            {
              children: [
                {
                  text: 'Velkommen til Sortland BK',
                },
              ],
              type: 'paragraph',
            },
          ],
        },
        id: 'L9ykNeJzlBHoVB6m00swF',
        isEmbed: true,
        type: 'text',
      },
      {
        children: [
          {
            data: {
              link: 'https://www.bridge.no/bridgemodule/bli_medlem?clubno=2261',
              value: 'Bli medlem',
            },
            id: 'FRx8XW_DVz8UCOgtjwzut',
            isEmbed: true,
            style: {
              _: 'primary',
            },
            type: 'button',
          },
          {
            data: {
              link: './resultater',
              value: 'Resultater',
            },
            id: 'mmJSQlrkMxSFXvmOzS40N',
            isEmbed: true,
            style: {
              _: 'secondary',
            },
            type: 'button',
          },
          {
            data: {
              link: './makkertorg',
              value: 'Makkertorg',
            },
            id: '0Tep6OD91S6-YjYkRbQzQ',
            isEmbed: true,
            style: {
              _: 'primary',
            },
            type: 'button',
          },
        ],
        data: {
          align: 'center',
          direction: 'horizontal',
          settings: {
            general: {
              align: 'center',
            },
          },
        },
        id: 'LrudY9bQddomXJ07n2JWJ',
        isEmbed: true,
        style: {
          _: 'default',
        },
        type: 'list:button',
      },
    ],
    data: {},
    id: 'I_XJ70rELJ5EUnmtcdjK6',
    style: {
      _: 'default',
    },
    type: 'bridge-carousel',
  },
  {
    data: {
      level: 2,
      settings: {
        level: 2,
      },
      value: 'NYHETER',
    },
    id: 'BqCetrqzRZXpRRNkbN3_m',
    style: {
      background: 'gray',
      type: 'bridge-title-center',
      width: 'fullwidth',
    },
    type: 'heading:title',
  },
  {
    data: {
      moreLink: './artikler',
      settings: {
        limit: 3,
      },
      value: [],
    },
    id: 'NyExk5IIa-qnCjNkt0K43',
    style: {
      background: 'gray',
      width: 'fullwidth',
    },
    type: 'bridge-top-news',
  },
  {
    children: [
      {
        data: {
          description: '',
          externalId: 7600,
          settings: {
            general: {},
          },
          src: 'images/l/lur/upload-1690736028-folkvang_4_b.jpeg',
        },
        id: 'ruLhJljiTwsbeRmGmxvZJ',
        type: 'image',
      },
      {
        children: [
          {
            data: {
              level: 2,
              settings: {
                level: 2,
              },
              value: 'OM Sortland BK',
            },
            id: 'xmjSG1vcG_6X3-NJamgEZ',
            style: {
              type: 'bridge-title',
            },
            type: 'heading:title',
          },
          {
            data: {
              value: [
                {
                  children: [
                    {
                      text: 'Velkommen til Sortland Bridgeklubb!',
                    },
                  ],
                  type: 'paragraph',
                },
                {
                  children: [
                    {
                      text: 'Vi spiller tirsdager kl 18.15 - 22.15 på Folkvang grendehus.',
                    },
                  ],
                  type: 'paragraph',
                },
                {
                  children: [
                    {
                      text: 'Forhåndspåmelding på bridge. no/Turneringer/Turneringsoversikt',
                    },
                  ],
                  type: 'paragraph',
                },
                {
                  children: [
                    {
                      text: 'Om du ønsker å spille, men mangler makker, kontakt Kristian B. Ellingsen (906 66 459, kristian.ellingsen@hotmail.com)',
                    },
                  ],
                  type: 'paragraph',
                },
                {
                  children: [
                    {
                      text: 'Sortland Bridgeklubb legger vekt på et hyggelig, vennskapelig og sosialt miljø.',
                    },
                  ],
                  type: 'paragraph',
                },
                {
                  children: [
                    {
                      text: 'Alle er hjertelig velkommen til en hyggelig bridgeopplevelse i klubben vår, enten du er nybegynner eller stormester.',
                    },
                  ],
                  type: 'paragraph',
                },
                {
                  children: [
                    {
                      text: '',
                    },
                  ],
                  type: 'paragraph',
                },
              ],
            },
            id: 'w6KamVbAbuC_YrmJIDsrT',
            type: 'text',
          },
        ],
        data: {},
        id: 'ius230v6c8MaVfJ8YAE1j',
        type: 'list',
      },
    ],
    data: {
      heroFullWidth: true,
      heroPosition: 'right',
    },
    editControl: 2,
    id: 'iwg_cyyyXzb3Mi8cfOiuI',
    style: {
      _: 'frontpage-row-space',
    },
    type: 'hero-text',
  },
  {
    data: {
      settings: {},
      title: 'MEDLEMMER',
    },
    id: 'bj4ziOkXr42wDQy8fmEkV',
    style: {
      _: 'frontpage-row-space',
    },
    type: 'bridge-club-members-countdown',
  },
  {
    data: {
      clubs: [],
      title: 'BRIDGEKLUBBER',
    },
    id: 'd68fRj5ms-LiK_t0DU6yY',
    style: {
      width: 'fullwidth',
    },
    type: 'bridge-club-dropdown',
  },
  {
    data: {
      links: [
        {
          image:
            'https://bridge.site.digimaker.com/var/images/t/txg/upload-524950872-grasrotandelen.png',
          link: 'https://www.norsk-tipping.no/grasrotandelen/din-mottaker/993840033',
          title: 'Test',
        },
      ],
      title: 'Lenker',
    },
    id: 'K3n41F5hlhTv1QytDgok0',
    style: {},
    type: 'bridge-links',
  },
];

iterateBlockList(testData as any, (blockitem) => {
  if (blockitem.type === 'hero-text' && Array.isArray(blockitem.children)) {
    const children = blockitem.children;
    blockitem.children = { hero: children[0], list: children[1] };
  }
  console.log(blockitem.type);
});
console.log(testData);

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
  },
  widgets: {
    heading: { defaultStyle: { _: 'big-space' } },
    'content-view': {
      views: [{ label: 'Block', value: 'block' }],
      render: (props: { data: any; view: string }) => {
        return (
          <div>
            Content: {props.data?.name}, View: {props.view}
          </div>
        );
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
      id: `widget-${nanoid()}`,
      style: { _: 'big-space' },
      data: {
        value: 'This is a heading',
        level: 2,
        settings: {
          align: 'left',
          general: {
            padding: 80,
          },
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
        { identifier: 'meta_key', name: 'Meta key', type: 'text' },
        { identifier: 'meta_description', name: 'Meta description', type: 'multitext' },
      ]);
      editor.setPageData({ title: 'New page', in_menu: false, theme: 'red', meta_key: 'test key' });
    }
  }, []);

  dmeServerSideLoad(data, null).then((d) => {
    console.log(d);
  });

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
