import { DME } from "Src/core/types/dmeditor";
import { BlockListRender } from "Src/core/main/renderer";
import { EntityButton } from "./entity";
import { StyledButton } from "./styled";

const Button = (props:DME.WidgetRenderProps<EntityButton>)=>{    
    const { blockNode, blockNode:{data:{value}}} = props;

    return <StyledButton href="#" className={props.rootClasses}>
            {value}
        </StyledButton>
}

export {Button};