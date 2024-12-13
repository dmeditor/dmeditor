import React from 'react';

import { DataSourceConfigType } from '../../../src/core/config';
import { useGlobalVars } from '../../../src/core/main/store';

export const DataSource: DataSourceConfigType['edit'] = (props) => {
  return <div>Good</div>;
};

export const fetchInClient: DataSourceConfigType['fetchInClient'] = async (
  widget,
  dataSource,
  vars,
) => {
  const varConfig = dataSource.variables;
  let v = '';
  if (varConfig) {
    v = vars[varConfig[0]] + '';
  }
  return { id: 'test', name: 'hello ' + v };
};
