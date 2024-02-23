import { registerWidget } from '..';
import TableWidget from './definition';
import Table from './Table';

export default () => {
  registerWidget(TableWidget, Table);
};
