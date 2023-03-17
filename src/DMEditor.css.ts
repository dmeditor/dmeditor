import { css } from "@emotion/css";
import { Util } from "./utils";


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
  width:0;
  transtion:all 2s,
}
.layout-left:hover .layout-left-menu.view{
  opacity: 1;
  width:var(--dme-layout-tool-width);
}

.layout-main{
    margin:auto;
    background: white;
    min-height: 100vh;
    @media (max-width: 1200px){
      width:calc(100% - ${Util.getScrollbarWidth()}px)!important;
    }
}

.block-container{
  position: relative;
}

.tool{
  display: none;
}

.viewmode-edit .block-container:hover > .tool, .viewmode-edit .block-container.active > .tool{
  display: block;
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

a:not(.block-type-text a){
  color: #12913e;
}

a:hover{
    color:#046726
}

hr{
    border-top: 1px solid #cccccc;
    border-bottom: none;
}


.tool{
  position: absolute;
  z-index: 15;
  left: 48%;
  width: 50px;
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
  padding-top: 2px;
}

.blockcontainer-horizontal{
  display: grid;
  grid-template-columns: auto auto;
}

.blockcontainer{
  outline: 1px solid rgba(0,0,0,0);
}

.viewmode-edit .block-container.active{
  outline: 1px solid #00721f !important;
  outline-offset: 1px;
}

.viewmode-edit .block-container:hover{
  outline: 1px dashed #00721f;
  outline-offset: 1px;
}

.viewmode-edit .inblock.block-container:hover, .viewmode-edit .active.inblock{
  outline: 1px dashed #00721f !important;
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

.block-type-imagetext > .block-type-image{
  display: inline-block;
}

::selection {
  color:auto;
  background:#ccc;
}

::-moz-selection {
    color:auto;
    background:#ccc;
}


.block-type-text span{
  vertical-align: initial !important;
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
`;


export const dmeditorViewCss = ()=>css`
&.dmeditor-view{
  margin:auto;
  background: white;
  min-height: 100vh;
  width:var(--dme-main-width);
  @media (max-width: 1200px) {
    width:100%;
  }
}

.layout-main.viewmode-tablet{
    width: var(--dme-main-width-pad);
}

.layout-main.viewmode-mobile{
    width: var(--dme-main-width-mobile);
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