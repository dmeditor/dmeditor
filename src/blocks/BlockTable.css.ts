import { css } from "@emotion/css";

export const tableCss = ()=> css`
.bani .bani-table{
    border-right:none;
    border-bottom: none;
    border-spacing: 0px;
    /* width: 100%; */
}
.bani .tdActive {
  outline: 1px dotted #1e6fff !important;
}

.bani .table__cell {
  padding-left: 5px;
  padding-right: 5px;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  z-index: 1;
}

.table__cell:empty::before{
  content: '\00a0';
}

.viewmode-edit .table__cell >div:empty::before{
  content: 'Empty';
  font-size: 14px;
  font-style: italic;
  color: #cccccc;
}

.bani .table__cell .cell {
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
  padding: 0 12px;
}
`;