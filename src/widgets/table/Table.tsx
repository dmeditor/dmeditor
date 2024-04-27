import { MiniText, useEditorStore } from '../../core';
import type { DME } from '../../core';
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

  const handleValueChange = (col: number, row: number, value: any) => {
    updateSelectedBlock((data) => {
      (data.value as any[])[col][row].value = value;
    });
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
                <MiniRichText
                  value={cell.value}
                  // onFocus={() => handleActiveCellChange(0, i)}
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
                    value={cell.value}
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