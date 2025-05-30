import styled from '@emotion/styled';

import { getGeneralStyle } from '../../core/setting-panel/property-setting';
import { EntityTableBlock } from './entity';

export const StyledTable = styled.table<EntityTableBlock['settings']>((props) => {
  const {
    borderType,
    borderColor = 'unset',
    oddRowBackground,
    headerIsBold,
    headerAlign,
    headerBackground,
    headerColor,
    padding,
    color,
  } = props;

  return {
    borderCollapse: 'collapse',
    minWidth: 200,
    color: color,
    'th, td': {
      ...(padding && { padding: padding + 'px' }),
      minWidth: 20,
      border: borderType === 'none' ? 'none' : '1px solid ' + borderColor,
      ...(borderType === 'rowBorder'
        ? {
            borderLeft: 'none',
            borderRight: 'none',
          }
        : undefined),
    },
    p: {
      margin: 0,
    },
    th: {
      fontWeight: headerIsBold ? 'bold' : 'normal',
      textAlign: headerAlign,
      color: headerColor,
      backgroundColor: headerBackground,
    },
    'tr:nth-of-type(odd)': {
      backgroundColor: oddRowBackground,
    },
  };
});
