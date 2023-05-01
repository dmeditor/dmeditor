# DM Editor

DM Editor is a block-styled visual editor written in React.

The idea behind is to make it easy to develop and style widget using React ecosystem, in the end together with developer bring editor good user experience.

[Roadmap](https://github.com/orgs/dmeditor/projects/1) , mail [xc](mailto:chen.xcmail@gmail.com) if you want to discuss:).

***For full documentation please go to [dmeditor.io](https://dmeditor.io)***

### Highlights
- Block based, real WYSIWYG(What you see is what you get)
- Intractive while editing, eg. click a tab and edit a tab's content
- Basic widgets: rich text, image, heading, table, video, iframe
- Intractive widgets: tab, accordion
- Get benefits of React ecosystem for creating widget, eg. sliding, resizing, dialog.
- Super easy to create widget template (mostly only css)


### Screenshots

<img src="https://www.digimaker.com/var/images/w/wzz/upload-2038061186-screen1.png" />


<img src="https://www.digimaker.com/var/images/l/loe/upload-103887251-screen2.png" />

## Installation

See [sample project](https://github.com/dmeditor/dmeditor-sample)

```
npm install dmeditor
```
*Note: to develop widgets, suggest to install `@mui/material` and `@emotion/css` so you get all benefits of mui and emotion css. See sample project for detail.*

### Templates
Put below in index.html to use open source templates ([the template repo](https://github.com/dmeditor/templates)): 
```
<script src="https://cdn.jsdelivr.net/gh/dmeditor/templates@main/templates.js"></script>
```


### Widget list
[dmeditor-digimaker](https://github.com/digimakergo/dmeditor-digimaker/):  - Content widgets(eg. content grid, Gallary) for digimaker CMF
