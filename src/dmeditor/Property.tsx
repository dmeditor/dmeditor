import { DeleteOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { blockManager } from "./BlockManager";
import { BlockData } from "./Main"
import { Tab } from "./Tab"

export const Property = (props:{current: BlockData, onSeting: any, onDelete:any})=>{

    const current = props.current;

    const renderProperty = ()=>{
        const render = blockManager.getBlockSettings(current.type);
        if( render ){
            return render(current.content, props.onSeting);
        }else{
            return <div>Unknown type {current.type}</div>;
        }
    }

    const content = <div>{renderProperty()}<div>  
        <br />           
        <Button fullWidth variant="contained" color='error' title="Delete" onClick={props.onDelete}>
            <DeleteOutline />Delete block
        </Button>
    </div></div>


    return <div>
        <Tab content={content} />
    </div>
}