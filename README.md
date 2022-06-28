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

### Sample project 
https://github.com/digimakergo/dmeditor-sample

### Screenshots

<img src="https://raw.githubusercontent.com/digimakergo/dmeditor/main/screen1.png" width="600"/>


<img src="https://raw.githubusercontent.com/digimakergo/dmeditor/main/screen2.png" width="600"/>

### Extending
#### 1.Create a customized block type(widget)

*Check [Full Image implementation](https://github.com/digimakergo/dmeditor/blob/main/src/blocks/FullImage.tsx) as example*
1. Create a block handler
```typescript
 export const FullImageHandler = {
    type: 'full_image',
    menu:  {text:"Full image", category:'basic',icon: <ImageOutlined /> },
    renderMain: (props:RenderMainProps)=><FullImage {...props} />,
    getDefaultData:():BlockData=>{
       return {
        layout:{padding: 0},
        data:{
            src:'https://sample.com/test.jpg',
            style: {padding: 2, borderWidth: 0, background:''}}}
        },
    renderSetting: (props:RenderSettingProps)=><FullImageSettings {...props} />
 }
```
2. Register the block handler(can be in App.tsx)

```typescript
import { FullImageHandler } from "./blocks/FullImage";


blockManager.registerBlockType(ContentBlockHandler);
```
