# DMEditor
dmeditor is a block-styled visual editor. Data is in json format.

### Highlights
- Real WYSIWYG(What you see is what you get)
- Block based
- Easy to create your own widget
- Data is saved in json

### Screenshots

<img src="https://raw.githubusercontent.com/digimakergo/dmeditor/main/screen1.png" width="600"/>


<img src="https://raw.githubusercontent.com/digimakergo/dmeditor/main/screen2.png" width="600"/>

### Installation

```
npm install dmeditor
```

## Usage
Check [Sample code](https://github.com/digimakergo/dmeditor-sample/blob/main/src/App.tsx) for source code.
```typescript
import {DMEditor} from 'dmeditor';

return (
    <div className="App">
        <DMEditor data={[]} />
    </div>);
```
View(Output only)
```typescript
import {DMEditorView} from 'dmeditor';

return (
    <div>
        <DMEditorView data={[{ type:'heading', 
          data:'News', 
          common:{marginTop: 10},
          settings:{level: 2}
        }]} />
    </div>);
```


### Sample project 
https://github.com/digimakergo/dmeditor-sample


### DMEditor Properties

| Property | required | Type | Description | 
|-----|-----|-----|-----|
| `data` | true | `Array<any>` | Data of blocks in array | 
| `onChange` | false | `(data:Array<any>)=>void`  | Callback when change. |
| `menu` | false | `React.ReactElement`  | Customized menu on toolbar |


### Widgets
[dmeditor-digimaker](https://github.com/digimakergo/dmeditor-digimaker/):  - Content widgets(eg. content grid, Gallary) for digimaker CMF

## Extending
### Create a customized block type(widget)

*Check [Full Image implementation](https://github.com/digimakergo/dmeditor/blob/main/src/blocks/BlockImage.tsx) as example*
1. Create a block handler
```typescript

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
