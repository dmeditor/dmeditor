import { DMEData } from '../../components/types/blocktype';
import { useEditorStore } from '../store';
import { BlockRender } from './BlockRender';

interface BlockListProps {
  data: DMEData.BlockList;
  selected: number;
  columns?: number;
  active?: boolean;
  settings?: {
    direction?: 'vertical' | 'horizontal'; //if not set, will be vertical
  };
  allowedType?: string[];
  view?: boolean;
  //adding when children is 0
  adding?: boolean;
  onActivate?: () => void;
}

export const BlockListRender = (props: BlockListProps) => {
  const {
    selected: { blockIndex: selectedBlockIndex },
    updateSelectedBlockIndex,
  } = useEditorStore();

  const select = (index: number) => {
    if (selectedBlockIndex !== index) {
      updateSelectedBlockIndex(index);
    }
  };

  return (
    <div className="dme-blocklist">
      {props.data.map((blockData: DMEData.Block, index: number) => (
        <BlockRender
          key={blockData.id}
          onActivate={() => select(index)}
          active={index === selectedBlockIndex}
          data={blockData}
        />
      ))}
    </div>
  );
};
