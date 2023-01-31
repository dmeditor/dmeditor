import { css } from "@emotion/css";

export const blockTabCss = ()=>css`
.item{
  display:grid;
  grid-template-columns: auto 40px;
}
.item>div.tabName{
  display:flex;
  align-items: center;
}
.item.active>div.tabName{
  outline: 1px dotted #1e6fff !important;
}
.item > div.tabName:empty::before{
  content: 'Empty';
  font-size: 14px;
  font-style: italic;
  color: #cccccc;
}
.blockTab .nav-item>button:empty::before{
  content: 'Empty';
  font-size: 14px;
  font-style: italic;
  color: #cccccc;
}
.expandableList .accordion-item .accordion-header>button:empty::before{
  content: 'Empty';
  font-size: 14px;
  font-style: italic;
  color: #cccccc;
}
`;