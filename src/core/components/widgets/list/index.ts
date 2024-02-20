import { List } from './List';
import { registerWidget, registerWidgetVariant } from "..";
import listWidget from "./definition";
import { DMEData } from 'Src/core/types/dmeditor';
import { nanoid } from 'nanoid';

const register = () =>{
    registerWidget(listWidget, List )
    registerWidgetVariant( {
        widget: 'list',
        identifier: 'button', 
        name: 'Button list', 
        allowedTypes:['button'],
        getDefaultData:():DMEData.Block<unknown>=>{
            return {
                id: nanoid(),
                type:'list:button',
                data:{direction: 'horizontal'},
                children: [{
                    id: nanoid(),
                    type: 'button',
                    data:{value: 'Button', link:'#'},
                    style:{type:'primary'},                    
                }]
            }
        }
    });
}

export default register ;