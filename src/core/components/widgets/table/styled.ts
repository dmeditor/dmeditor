import styled from '@emotion/styled';

import { EntityTableBlock } from './entity';

export const StyledTable = styled.table<EntityTableBlock['settings']>((props) => {
  const {
    borderType,
    borderColor = 'unset',
    oddRowBackground,
    headerIsBold,
    headerAlign,
    headerBackground,
  } = props;

  return {
    borderCollapse: 'collapse',
    width: '100%',
    'th, td': {
      border: borderType === 'none' ? 'none' : '1px solid ' + borderColor,
      ...(borderType === 'rowBorder'
        ? {
            borderLeft: 'none',
            borderRight: 'none',
          }
        : undefined),
    },
    th: {
      fontWeight: headerIsBold ? 'bold' : 'normal',
      textAlign: headerAlign,
      backgroundColor: headerBackground,
    },
    'tr:nth-of-type(odd)': {
      backgroundColor: oddRowBackground,
    },
  };
});
