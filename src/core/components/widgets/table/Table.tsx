import { TextField } from '@mui/material';
import MiniText from 'dmeditor/components/utility/MiniText';
import { DME, useEditorStore } from 'dmeditor/index';
import { isString } from 'dmeditor/utils';

import type { EntityTableBlock } from './entity';
import { useTableStore } from './store';
import { StyledTable } from './styled';

const Table = (props: DME.WidgetRenderProps<EntityTableBlock>) => {
  const { blockNode, rootClasses } = props;
  const {
    id,
    data: { value, settings },
  } = blockNode;

  const { updateSelectedBlock } = useEditorStore();
  const { setActiveCellIndex: setActiveIndex } = useTableStore();

  const handleTextChange = (col: number, row: number, value: any) => {
    updateSelectedBlock((data) => ((data.value as any[])[col][row] = value));
  };

  const handleValueChange = (value: any) => {
    // TODO: update value
  };

  const handleActiveCellChange = (col: number, row: number) => {
    setActiveIndex([col, row]);
  };
  const tableValue = settings['hasHeader'] ? value.slice(1) : value;

  return (
    <StyledTable className={rootClasses} id={id} {...settings}>
      {settings['hasHeader'] && (
        <thead>
          <tr className="dme-w-tr">
            {value[0].map((cell, i) => (
              <th className="dme-w-th" key={i}>
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
          <tr className="dme-w-tr">
            {row.map((cell, j) => {
              if (isString(cell)) {
                return (
                  <td className="dm-w-td" key={j}>
                    <TextField
                      variant="standard"
                      value={cell}
                      onFocus={() => handleActiveCellChange(i, j)}
                      onChange={(evt) => handleTextChange(i, j, evt.target.value)}
                    />
                  </td>
                );
              } else {
                return (
                  <td className="dm-w-td" key={j}>
                    <MiniText
                      blockNode={{
                        data: {
                          value: [
                            {
                              type: 'paragraph',
                              children: [{ text: 'Sample text' }],
                            },
                          ],
                        },
                      }}
                      onChange={handleValueChange}
                    />
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
