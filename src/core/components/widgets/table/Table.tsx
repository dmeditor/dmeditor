import { TextField } from '@mui/material';

import type { EntityTableBlock } from './entity';
import { StyledTable } from './styled';
import { DME, useEditorStore } from 'Core/index';

const Table = (props: DME.WidgetRenderProps<EntityTableBlock>) => {
  const { blockNode, rootClasses } = props;
  const {
    id,
    data: { value, settings },
  } = blockNode;

  const { updateSelectedBlock } = useEditorStore();

  const handleTextChange = (col: number, row: number, value: string) => {
    updateSelectedBlock((data) => (data.value[col][row] = value));
  };

  const handleActiveCellChange = (col: number, row: number) => {
    updateSelectedBlock((data) => (data.activeCellIndex = [col, row]));
  };
  const tableValue = settings['has-header'] ? value.slice(1) : value;

  return (
    <StyledTable className={rootClasses} id={id} {...settings}>
      {settings['has-header'] && (
        <thead>
          <tr>
            {value[0].map((cell, i) => (
              <th key={i}>
                <TextField
                  variant="standard"
                  value={cell}
                  onFocus={() => handleActiveCellChange(0, i)}
                  onChange={(evt) => handleTextChange(0, i, evt.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {tableValue.map((row, i) => (
          <tr>
            {row.map((cell, j) => (
              <td key={j}>
                <TextField
                  variant="standard"
                  value={cell}
                  onFocus={() => handleActiveCellChange(i, j)}
                  onChange={(evt) => handleTextChange(i, j, evt.target.value)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
