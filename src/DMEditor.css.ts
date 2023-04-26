import { css } from "@emotion/css";
import { Util } from "./utils";
import { ReactResizable } from './utils/ReactResizable';


export const dmeditorCss = ()=>css`
  height: 100vh;
  background-color: #f0f0f0;
  display: grid;
  grid-template-columns:var(--dme-layout-tool-width) var(--dme-container-width) var(--dme-layout-property-width);
  color: #333333;
  margin: auto;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  box-shadow: 0px 0px 3px #cccccc;
  &.view{
    grid-template-columns:auto;
    .layout-left{
      position:absolute;
      left:0;
      top:0;
      z-index: 500;
    }    
  }

  &.settings{
      grid-template-columns: var(--dme-layout-tool-width) auto;
  }

.layout-properties{
    border-left: 1px solid #dddddd;
    overflow-y: scroll;
    overflow-x: hidden;
    background: white;
    position: relative;
}


.layout-left-menu{
    background-color: white;
    text-align: center;
    border-right: 1px solid #cccccc;
    position: relative;
    opacity: 1;
    height:100vh
}
.layout-left-menu.view{
  opacity: 0;
  transtion:all 2s,
}
.layout-left:hover .layout-left-menu.view{
  opacity: 1;
  width:var(--dme-layout-tool-width);
}

.dme-settings > div{
  max-width: 900px;
  margin: auto;
  min-height: 100%;
  background-color: white;
  padding: 10px;
}

.layout-main{
    margin:auto;
    background: white;
    min-height: 100vh;
    @media (max-width: 1200px){
      width:calc(100% - var(--dme-scrollbarWidth))!important;
    }
}

.block-container{
  position: relative;
}

.tool{
  display: none;
}

.viewmode-edit{
  .block-container:not(.inblock):hover > .tool, 
  .block-container.active .block-container:hover > .tool,
  .block-container.active > .tool{
    display: block;
  }

  .block-container:not(.inblock):hover{
    outline: 1px dashed #00721f;
    outline-offset: 1px;
  }

  .block-container.active .inblock.block-container:hover, .viewmode-edit .active.inblock{
    outline: 1px dashed #00721f !important;
    outline-offset: 1px;
  }

} 

.layout-main.viewmode-pc, .layout-main.viewmode-edit{
  width:var(--dme-main-width);
}


.layout-main.viewmode-tablet{
    width: var(--dme-main-width-pad);
}

.layout-main.viewmode-mobile{
    width: var(--dme-main-width-mobile);
}
.layout-main.viewmode-pc .dmeditor-view, 
.layout-main.viewmode-edit .dmeditor-view,
.layout-main.viewmode-tablet .dmeditor-view,
.layout-main.viewmode-mobile .dmeditor-view{
  width: 100%!important;
}

.left-tool a{
    color: #666666;
    display: inline-block;
    padding: 5px 0px;
}

.left-tool a.current{
    color: green
}

.layout-main-container{
    height: 100%; 
    overflow-y: scroll;
}

[contenteditable='true'] {
    outline: 0px solid transparent;
  }
 
.block-active{
    outline: 1px solid #1ed45d;
    box-shadow: 0px 0px 4px #12913e;
}

a{
  text-decoration: none;
  box-shadow: none!important;
}

a.tool-item, .layout-properties a{
  color: #12913e;
}

a:hover{
    color:#046726
}

.left-tool hr{
    border-top: 1px solid #aeaeae;
    border-bottom: none;
    margin: 5px 0px;
}


.tool{
  position: absolute;
  z-index: 15;
  left: 40%;
  width: 20%;
  text-align: center;
}

.is-preview .tool{
  display: none;
}

.tool-above{
  top: -26px;
  height: 26px;
}

.tool-under{
  bottom: -26px;
  height: 26px;
}

/* .block-container:first-child .tool-above {
  top: 0px;
}

.block-container:last-child .tool-under {
  bottom: 0px;
} */

.blockcontainer-horizontal{
  display: grid;
  grid-template-columns: auto auto;
}

.block-quote{
  text-align: center;
  font-size: 1.3rem;
  display: block;
}

.blockcontainer{
  outline: 1px solid rgba(0,0,0,0);
}

.viewmode-edit .block-container.active{
  outline: 1px solid #00721f !important;
  outline-offset: 1px;
}

.tab-active{
  color:green !important;
}

.blockcontainer:hover{
  outline: 1px dotted #333333;
}

.blockcontainer{
  margin: 0px;
}

.blockcontainer-align-center{
  text-align: center;
}

.blockcontainer-align-right{
  text-align: right;
}

*[contenteditable="true"]:empty::before {
  content: "Please input";
  font-size: 14px;
  color: #999;
  margin-left: 5px;
  vertical-align: middle;
}

::selection {
  color:auto;
  background:#ccc;
}

::-moz-selection {
    color:auto;
    background:#ccc;
}


.tool-item{
  background: white;
}

.pre-render{
  position: absolute;
  left:-105px;
}

.viewmode-edit .btn{
  user-select:inherit;
  -webkit-user-select:inherit;
} 

.menu-blocktype{
  font-size: 15px;
}

#dmeditor-add-menu > div{
  position: absolute;
  top:0px;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index:100;
}
.btn.btn-success {
  color:#fff;
}

.property-tab-container > div{
  display: inline-block;
}

#dmeditor-property > div:first-child{
  border-bottom: 1px solid #ccc;
}

.tab-header .btn, .tab-header.normal:last-child .btn{
   color: rgba(0, 0, 0, 0.6)
}

.tab-header.current .btn, .tab-header:last-child .btn{
  color: #12913e
}

.tab-body:not(:last-child){
  display: none;
}

.tab-header{
  padding: 5px;
}

.block-container.active > .tool{
  opacity: 0;
}

.block-container.active > .tool:hover{
  opacity: 1;
}

.tab-body{
  padding: 10px;
}
`;


export const dmeditorViewCss = ()=>css`
&.dmeditor-view{
  margin:auto;
  background: white;
  width:var(--dme-main-width);
  @media (max-width: 1200px) {
    width:100%;
  }
}
.box{
  background: #f9f9f9;
}

.block-type-text div[data-slate-editor='true']{
   overflow:hidden;
}
.block-type-text span{
  vertical-align: top!important;
}
.fullScreen{
  width:calc(var(--dme-container-width) - var(--dme-scrollbarWidth))!important;
  margin-left: calc(-1*(var(--dme-container-width) - var(--dme-scrollbarWidth) - var(--dme-main-width)) / 2)!important;
}

.layout-main.viewmode-tablet{
    width: var(--dme-main-width-pad);
}

.layout-main.viewmode-mobile{
    width: var(--dme-main-width-mobile);
}
// .block-type-imagetext > .block-type-image{
//   display: inline-block;
// }
.imagetext_container .block-type-image>div{
 width:calc(var(--dme-main-width)*0.5);
}

.block-container{
  position: relative;
}
.image-caption{
  font-style: italic;
}

.dm-columns{
  display: grid;
}

.columns-2{
  grid-template-columns: 50% 50%;
}

.columns-3{
  grid-template-columns: 33.3% 33.3% 33.3%;
}

.columns-4{
  grid-template-columns: 25% 25% 25% 25%;
}

.columns-5{
  grid-template-columns: 20% 20% 20% 20% 20%;
}

.columns-6{
  grid-template-columns: 16.6% 16.6% 16.6% 16.6% 16.6% 16.6%;
}
`;

export const ReactResizableCss = () => css`
.react-resizable {
  position: relative;
}
.react-resizable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+');
  background-position: bottom right;
  padding: 0 3px 3px 0;
}
.react-resizable-handle-sw {
  bottom: 0;
  left: 0;
  cursor: sw-resize;
  transform: rotate(90deg);
}
.react-resizable-handle-se {
  bottom: 0;
  right: 0;
  cursor: se-resize;
}
.react-resizable-handle-nw {
  top: 0;
  left: 0;
  cursor: nw-resize;
  transform: rotate(180deg);
}
.react-resizable-handle-ne {
  top: 0;
  right: 0;
  cursor: ne-resize;
  transform: rotate(270deg);
}
.react-resizable-handle-w,
.react-resizable-handle-e {
  top: 50%;
  margin-top: -10px;
  cursor: ew-resize;
}
.react-resizable-handle-w {
  left: 0;
  transform: rotate(135deg);
}
.react-resizable-handle-e {
  right: 0;
  transform: rotate(315deg);
}
.react-resizable-handle-n,
.react-resizable-handle-s {
  left: 50%;
  margin-left: -10px;
  cursor: ns-resize;
}
.react-resizable-handle-n {
  top: 0;
  transform: rotate(225deg);
}
.react-resizable-handle-s {
  bottom: 0;
  transform: rotate(45deg);
}
.hover-handles .react-resizable-handle {
  display: none;
}
.hover-handles:hover .react-resizable-handle {
  display: block;
}

`