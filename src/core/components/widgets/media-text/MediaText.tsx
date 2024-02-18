import { BlockListRender, BlockRender } from "Src/core/main/renderer";
import { EntityImageText } from "./entity";
import { DME } from "Src/core/types";
import { MediaTextContainer } from "./styled";
import { getAllowedTypes, getWidget, getWidgetWithVariant } from "..";

const MediaText = (props:DME.WidgetRenderProps<EntityImageText>)=>{
    const {blockNode:{children, data:{mediaPosition}}, path, blockNode, styleClasses} = props;

    if(children?.length !== 2 ){
        console.warn('Image text should be 2 children. Ignored.');
        return <></>
    }

    const getClass = (type:string)=>{
        if(!styleClasses || !styleClasses[type]){
            return '';
        }
        return styleClasses[type].join(' ');
    }

    const renderImage = ()=><div className={getClass('media')+' dme-w-media'}><BlockRender data={children[0]} path={path} /></div>;
    const renderList = ()=> <div className={getClass('list')+' dme-w-list'}><BlockListRender blockData={children[1].children||[]} allowedTypes={getAllowedTypes(blockNode.type)} path={path} /></div>;

    return <MediaTextContainer className={props.rootClasses}>
        {mediaPosition!=='right'&&<>
            {renderImage()}
            {renderList()}
        </>}
        {mediaPosition==='right'&&<>
            {renderList()}
            {renderImage()}
        </>}

             
    </MediaTextContainer>
}

export {MediaText};