import { blockManager } from "./BlockManager";
import { BlockData } from "./Main"
import { Tab } from "./Tab"

export const Property = (props:{current: BlockData})=>{

    const current = props.current;

    const renderProperty = ()=>{
        const render = blockManager.getBlockSettings(current.type);
        if( render ){
            return render(current.content);
        }else{
            return <div>Unknown type {current.type}</div>;
        }
    }

    const content = <div>{renderProperty()}</div>


    return <div>
        <Tab content={content} />
    </div>
}