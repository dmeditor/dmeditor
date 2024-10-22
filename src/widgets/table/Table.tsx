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
      {settings.hasHeader && (
        <thead>
          <tr className={styleClasses['tr-h'] || 'dme-w-tr-h'}>
            {value[0].map((cell, i) => (
              <th
                className={styleClasses['th'] || 'dme-w-th'}
                key={i}
                onClick={() => handleActiveCellChange(0, i)}
                style={props.mode === 'edit' && !cell ? { minWidth: 50 } : {}}
              >
                <MiniRichText
                  mode={props.mode}
                  value={cell}
                  placeHolder="Input"
                  onValueChange={(newValue) => handleValueChange(0, i, newValue)}
                />
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {tableValue.map((row, idx) => (
          <tr className={styleClasses['tr'] || 'dme-w-tr'} key={idx}>
            {row.map((cell, jdx) => {
              return (
                <td
                  className={styleClasses['td'] || 'dme-w-td'}
                  onClick={() => handleActiveCellChange(idx, jdx)}
                  style={props.mode === 'edit' && !cell ? { minWidth: 50 } : {}}
                >
                  <MiniRichText
                    mode={props.mode}
                    placeHolder="Input"
                    useEffectToUpdate={true}
                    value={cell}
                    onValueChange={(newValue) =>
                      handleValueChange(settings.hasHeader ? idx + 1 : idx, jdx, newValue)
                    }
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
