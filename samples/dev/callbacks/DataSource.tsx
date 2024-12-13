import React from 'react';

import { DataSourceConfigType } from '../../../src/core/config';

export const DataSource: DataSourceConfigType['edit'] = (props) => {
  return <div>Good</div>;
};

export const fetchInClient: DataSourceConfigType['fetchInClient'] = async (props) => {
  return { id: 'test', name: 'hello' };
};
