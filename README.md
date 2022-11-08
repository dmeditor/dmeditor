# DMEditor
dmeditor is a block-styled visual editor. Data is in json format.

*Progress: It's still under development and some apis may change!*

### Highlights
- Block based
- Real WYSIWYG(What you see is what you get)
- Widgets like heading, paragraph, table, full image, content blocks, carousel
- Easy to create your own widget
- Data is saved in json
- Widgets supporting data source and showing them instantly
- Can be embeded to a page to edit from frontend

### Installation

```
npm install dmeditor
```

### Usage
Check [Sample code](https://github.com/digimakergo/dmeditor-sample/blob/main/src/App.tsx) for source code.
```typescript

return (
    <div className="App">
        <DMEditor data={[]} />
    </div>);
```

### Sample project 
https://github.com/digimakergo/dmeditor-sample

### Screenshots

<img src="https://raw.githubusercontent.com/digimakergo/dmeditor/main/screen1.png" width="600"/>


<img src="https://raw.githubusercontent.com/digimakergo/dmeditor/main/screen2.png" width="600"/>

### Extending
#### 1.Create a customized block type(widget)

*Check [Full Image implementation](https://github.com/digimakergo/dmeditor/blob/main/src/blocks/BlockImage.tsx) as example*
1. Create a block handler
```typescript

//define a tool
import { ToolRenderProps } from "dmeditor";

import {PropertyGroup, PropertyItem, Ranger} from 'dmeditor/utils';

//Implementation
export const BlockImage = (props:ToolRenderProps)=>{
   ///add status control here

    return <div>
    {* property */}           
            <BlockProperty title={'Image'} active={props.active}>
                <PropertyItem label="Width">
                    <input type="text" defaultValue={width} onChange={(e)=>setWidth(parseInt(e.target.value))} />
                </PropertyItem>               
            </BlockProperty>

                <img width={'100%'} src={imageUrl} />        
            </div>
}


//Define toolImage
  export const toolImage:ToolDefinition = {
    type: 'image',
    menu:  {text:"Image", category:'basic',icon: <ImageOutlined /> },
    initData: {type:'image', content:'http://test.com/svg.png'},
    render: (props:ToolRenderProps)=><BlockImage {...props} />
};
  
```
2. Register the tool(and new category) (can be in App.tsx)

```typescript
import { registerTool, registerCategory } from "dmeditor/ToolDefinition";

//register a category if it doesn't exist
registerCategory({identifier:'content', text:'Content'});

//register the tool
registerTool(toolImage);
```
