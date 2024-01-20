import { Data } from "../../components/types/blocktype";
import { BlockRender } from "./BlockRender";

interface BlockListProps {
    data: DMEDMEData.BlockList;
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


export const BlockListRender = (props: BlockListProps)=>{
    return <div className="dme-blocklist">
        {props.data.map((blockData: DMEData.Block)=><BlockRender data={blockData} onChange={()=>{}} />)}
    </div>
}