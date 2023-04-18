[Home](/) | [Create a widget](/create-widget) | [github project](https://github.com/digimakergo/dmeditor)

<ins>**DM Editor**</ins> is a block-styled visual editor.

### Highlights
- Block based, real WYSIWYG(What you see is what you get)
- Intractive while editing, eg. click a tab and edit a tab's content
- Basic widgets: rich text, image, heading, table, video, iframe
- Intractive widgets: tab, accordion
- Data saved in json
- Super easy to create styled widget(eg. line under h2)
- Easy to create own widget

### Screenshots

<a href="https://raw.githubusercontent.com/digimakergo/dmeditor/main/screen1.png"><img width="500px" src="https://raw.githubusercontent.com/digimakergo/dmeditor/main/screen1.png" /></a>

<a href="https://raw.githubusercontent.com/digimakergo/dmeditor/main/screen2.png"><img width="500px" src="https://raw.githubusercontent.com/digimakergo/dmeditor/main/screen2.png" /></a>

### Installation

```
npm install dmeditor
```


### Widgets
[dmeditor-digimaker](https://github.com/digimakergo/dmeditor-digimaker/):  - Content widgets(eg. content grid, Gallary) for digimaker CMF

Leave a messge [here](https://github.com/digimakergo/dmeditor/issues/1) if you want to promot your widgets.

### Server side rendering

DM Editor can be used directly in server side rendering via eg. NextJs. For non-nodejs environment(eg. .NET), you can run [dmeditor-server](https://github.com/digimakergo/dmeditor-server) to output html&js&css.

### Usage

[Sample project](https://github.com/digimakergo/dmeditor-sample)

Edit:
```typescript
import {DMEditor} from 'dmeditor';

//...
<DMEditor data={[]} />
```

View:
```typescript
import {DMEditorView} from 'dmeditor';

//...
<DMEditorView data={data} />
```

