import { DME } from "Src/core/types";
import { EntityGrid } from "./entity";
import { StyledGrid } from "./styled";
import { BlockListRender } from "Src/core/main/renderer";

const Grid = (props:DME.WidgetRenderProps<EntityGrid>)=>{    
    const { blockNode, blockNode:{data:{columns}, children}} = props;

    return <StyledGrid columns={columns}>
            <BlockListRender blockData={children || []} path={props.path} />
        </StyledGrid>
}

export {Grid};