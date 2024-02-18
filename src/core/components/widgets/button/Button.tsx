import { DME } from "Src/core/types";
import { BlockListRender } from "Src/core/main/renderer";
import { EntityButton } from "./entity";

const Button = (props:DME.WidgetRenderProps<EntityButton>)=>{    
    const { blockNode, blockNode:{data:{value}}} = props;

    return <a href="#" className={props.rootClasses}>
            {value}
        </a>
}

export {Button};