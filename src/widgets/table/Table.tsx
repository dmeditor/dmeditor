import { MiniText, useEditorStore } from '../..';
import type { DME } from '../..';
import type { EntityTableBlock } from './entity';
import { useTableStore } from './store';
import { StyledTable } from './styled';

const Table = (props: DME.WidgetRenderProps<EntityTableBlock>) => {
  const { blockNode, path } = props;
  const {
    id,
    data: { value, settings },
  } = blockNode;

  const { updateBlockByPath } = useEditorStore();
  const { setActiveCellIndex: setActiveIndex } = useTableStore();

  const handleValueChange = (col: number, row: number, value: any) => {
    updateBlockByPath(path, (data) => {
      (data.value as any[])[col][row] = value;
    });
  };

  const handleActiveCellChange = (row: number, cell: number) => {
    setActiveIndex([row, cell]);
  };
  const tableValue = settings['hasHeader'] ? value.slice(1) : value;

  return (
    <StyledTable id={id} {...settings}>
      {settings['hasHeader'] && (
        <thead>
          <tr className="dme-w-tr">
            {value[0].map((cell, i) => (
              <th className="dme-w-th" key={i}>
                <MiniText
                  key={i}
                  mode={props.mode}
                  value={cell}
                  placeHolder="Input"
                  onFocus={() => handleActiveCellChange(0, i)}
                  onValueChange={(newValue) => handleValueChange(0, i, newValue)}
                />
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {tableValue.map((row, idx) => (
          <tr className="dme-w-tr">
            {row.map((cell, jdx) => {
              return (
                <td className="dm-w-td" key={jdx}>
                  <MiniText
                    key={idx + ',' + jdx}
                    mode={props.mode}
                    placeHolder="Input"
                    value={cell}
                    onFocus={() => handleActiveCellChange(idx, jdx)}
                    onValueChange={(newValue) => handleValueChange(idx, jdx, newValue)}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
