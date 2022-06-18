import { DeleteOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { blockManager } from "./BlockManager";
import { BlockInfo } from "./Main"
import { Tab } from "./Tab"

export const Property = (props:{current: BlockInfo, onSeting: any, onDelete:any})=>{

    const current = props.current;

    const renderProperty = ()=>{
        const handler = blockManager.getBlockType(current.type);
        if( handler ){
            return handler.renderSetting(current.content, props.onSeting);
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