import React from 'react';

import { DataSourceConfigType } from '../../../src/core/config';
import { useGlobalVars } from '../../../src/core/main/store';

export const DataSource: DataSourceConfigType['edit'] = (props) => {
  return <div>Good</div>;
};

export const fetchInClient: DataSourceConfigType['fetchInClient'] = async (
  widget,
  dataSource,
  values,
) => {
  const v = values.dependencyValue;
  return { id: v, name: 'hello' };
};
