[Home](/) | [Create a widget](/create-widget) | [github project](https://github.com/digimakergo/dmeditor)

## Create your widget

You can create a new widget which has unique type, or you can create a 'style' of existing widget, eg. add a line under h2. We call it styled widget.

### 1. Create your own widget (block type)

*Check [Full Image implementation](https://github.com/digimakergo/dmeditor/blob/main/src/blocks/BlockImage.tsx) as example*
#### 1.1. Create a block handler

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

#### 1.2. Register the tool(and new category) (can be in App.tsx)

```typescript
import { registerTool, registerCategory } from "dmeditor";

//register a category if it doesn't exist
registerCategory({identifier:'content', text:'Content'});

//register the tool
registerTool(toolImage);
```

### 2. Styled widget

There are 2 ways to styleize a widget, first way is in App.tsx, second way is in <script> or external js file.

#### 2.1 Register from react(eg. in your App.tsx)

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
#### 2.2 Register from global `<script>`
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

