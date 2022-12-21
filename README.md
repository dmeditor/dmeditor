# DM Editor

<ins>**DM Editor**</ins> is a block-styled visual editor.

[Go to github project](https://github.com/digimakergo/dmeditor)

### Highlights
- Block based, real WYSIWYG(What you see is what you get)
- Easy to create your own widgets
- Style widgets like scoped css
- Data is saved in json

### Screenshots

<img src="https://raw.githubusercontent.com/digimakergo/dmeditor/main/screen1.png" width="600"/>


<img src="https://raw.githubusercontent.com/digimakergo/dmeditor/main/screen2.png" width="600"/>

## Installation

```
npm install dmeditor
```

### Usage

[Sample project](https://github.com/digimakergo/dmeditor-sample)

```typescript
import {DMEditor} from 'dmeditor';

return (
    <div className="App">
        <DMEditor data={[]} />
    </div>);

//View: <DMEditorView data={data} />
```

### DMEditor Properties

| Property | required | Type | Description | 
|-----|-----|-----|-----|
| `data` | true | `Array<any>` | Data of blocks in array | 
| `onChange` | false | `(data:Array<any>)=>void`  | Callback when change. |
| `menu` | false | `React.ReactElement`  | Customized menu on toolbar |


## Create your widget
### 1. Create a styled widget(customizing from existing widgets)
You can register template from react project, or external js

#### 1.1 Register from react

```javascript
import { registerTemplate } from "dmeditor";

registerTemplate(
        blocktype: 'heading',        
        identifier:'blocktext_heading_sample', 
        name:'Block heading text', 
        css:`background:#ffcc00; 
        h2{
            text-align:center;
        }`,
        initData: ()=>{
          const data = {type:'heading', settings:{level: 2}};
          return {...data, data:'Hello1', common:{...data.common, color: '#9C27B0' }}
        }
);
```
#### 1.2 Register from global `<script>`
DMEditor reads global variable `dmeditor`'s `templates` property for all templates.

```javascript
var dmeditor = {
templates:[
  {
          blocktype: 'heading',        
          identifier:'blocktext_heading_sample', 
          name:'Block heading text', 
          css:`background:#ffcc00; 
          h2{
              text-align:center;
          }`,
          initData: ()=>{
            const data = {type:'heading', settings:{level: 2}};
            return {...data, data:'Hello1', common:{...data.common, color: '#9C27B0' }}
          }, 
      }
]
}
```

### 2. Create your own block type(widget)

*Check [Full Image implementation](https://github.com/digimakergo/dmeditor/blob/main/src/blocks/BlockImage.tsx) as example*
1. Create a block handler

```javascript

//define a tool
import { ToolRenderProps } from "dmeditor";

import {PropertyGroup, PropertyItem, Ranger} from 'dmeditor/utils';

//Implementation
export const BlockImage = (props:ToolRenderProps)=>{
   ///add status control here
   const [url, setUrl] = useState(props.data.data as string);
   const [width, setWidth] = useState(300);

    return <div>
    {* property */}           
            <BlockProperty title={'Image'} active={props.active}>
                <PropertyItem label="Width">
                    <input type="text" defaultValue={width} onChange={(e)=>setWidth(parseInt(e.target.value))} />
                </PropertyItem>               
            </BlockProperty>

            <img width={width} src={imageUrl} />        
            </div>
}


//Define toolImage
  export const toolImage:ToolDefinition = {
    type: 'image',
    menu:  {text:"Image", category:'basic',icon: <ImageOutlined /> },
    initData: {type:'image', data:'http://test.com/svg.png', settings:{}},
    view: BlockImage,
    render: BlockImage
};
  
```
2. Register the tool(and new category) (can be in App.tsx)

```typescript
import { registerTool, registerCategory } from "dmeditor";

//register a category if it doesn't exist
registerCategory({identifier:'content', text:'Content'});

//register the tool
registerTool(toolImage);
```

### Data format

Here is an example:

```javascript
[
    { type:'image',
      data:'http://test.com/svg.png'},
    { type:'heading', 
      data:'News', 
      common:{marginTop: 10},
      settings:{level: 2}
    },
]
```

| Key | Description | Example  |
|------|----|---|
|  `type`    | Block type's identifier, unique   |  `'text'` |
|  `data`    | Variant types depends on block type. In principle reflect the 'value'   |  `'http://test.com/svg.png'` in `image` block type |
|  `common`    | General settings   |  `{marginTop: 10}` - margin to top is 10 pixel |
|  `settings`    |  Variant types depends on block type  | In heading `{level: 2}` means using h2 |
|  `source`    |  Variant types depends on block type. In principle reflect fixed or dyanmic data source  | In image: `source:{sourceType: 'input'}`|


### Widget list
[dmeditor-digimaker](https://github.com/digimakergo/dmeditor-digimaker/):  - Content widgets(eg. content grid, Gallary) for digimaker CMF
