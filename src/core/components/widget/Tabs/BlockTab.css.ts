import { css } from '@emotion/css';

export const blockTabCss = () => css`
  .item {
    display: grid;
    grid-template-columns: auto 85px;
    padding: 5px 0;
  }
  .item > div.tabName {
    display: flex;
    align-items: center;
  }
  .item > div.tabName:hover {
    outline: 1px dotted #1e6fff !important;
  }
  .item.active > div.tabName {
    outline: 1px solid #1e6fff !important;
  }
  .item > div.tabName:empty::before {
    content: 'Empty';
    font-size: 14px;
    font-style: italic;
    color: #cccccc;
  }
  .item > div.btn-groups {
    text-align: right;
  }
  .item > div.btn-groups button {
    min-width: 0px !important;
    padding: 1px !important;
  }
  .nav-item > button:empty::before {
    content: 'Empty';
    font-size: 14px;
    font-style: italic;
    color: #cccccc;
  }
  .expandableList .accordion-item .accordion-header > button:empty::before {
    content: 'Empty';
    font-size: 14px;
    font-style: italic;
    color: #cccccc;
  }
`;
