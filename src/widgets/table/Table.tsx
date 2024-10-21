import { MiniRichText, useEditorStore } from '../..';
import type { DME } from '../..';
import type { EntityTableBlock } from './entity';
import { useTableStore } from './store';
import { StyledTable } from './styled';

const Table = (props: DME.WidgetRenderProps<EntityTableBlock>) => {
  const { blockNode, path, styleClasses } = props;
  const {
    id,
    data: { value, settings },
  } = blockNode;

  const { updateBlockByPath } = useEditorStore();
  const { setActiveCellIndex: setActiveIndex, activeCellIndex } = useTableStore();

  const handleValueChange = (row: number, col: number, value: any) => {
    updateBlockByPath(path, (data) => {
      (data.value as any[])[row][col] = value;
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
          <tr className={styleClasses['tr-h'] || 'dme-w-tr-h'}>
            {value[0].map((cell, i) => (
              <th className={styleClasses['th'] || 'dme-w-th'} key={i}>
                <MiniRichText
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
          <tr className={styleClasses['tr'] || 'dme-w-tr'}>
            {row.map((cell, jdx) => {
              return (
                <td
                  className={styleClasses['td'] || 'dme-w-td'}
                  key={idx + ',' + jdx}
                  onClick={() => handleActiveCellChange(idx, jdx)}
                >
                  <MiniRichText
                    mode={props.mode}
                    placeHolder="Input"
                    value={cell}
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
