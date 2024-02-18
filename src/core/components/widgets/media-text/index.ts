import { DMEData } from "Src/core/types";
import { registerWidget, registerWidgetStyle, registerWidgetVariant } from "..";
import mediaTextWidget from "./definition";
import { MediaText } from "./MediaText";
import { nanoid } from "nanoid";

const register = () =>{
    registerWidget(mediaTextWidget, MediaText );
    registerWidgetVariant(
        {widget: 'media-text', 
        identifier: 'image',
        name: 'Image text',
        allowedTypes:['heading'],
        getDefaultData:():DMEData.Block=>{
            return {
                id: nanoid(),
                type: 'media-text:image',
                data: {
                    mediaPosition:'left'
                },
                style:{space:'big'},
                children:[            
                {
                    id: nanoid(),
                    type: 'heading',
                    data: {
                        value: 'This is a new block',
                        level: 2,                  
                    },
                },
                {
                    id:nanoid(),
                    type:'list',
                    data:{align: 'right'},
                    children:[
                        {
                            id: nanoid(),
                            type: 'heading',
                            data: {
                                value: 'This is a new block 1',
                                level: 2,                         
                            },
                        },
                        {
                            id: nanoid(),
                            type:'list:button',
                            data:{direction: 'horizontal'},
                            children: [{
                                id: nanoid(),
                                type: 'button',
                                data:{value: 'Button'},
                                style:{style:'primary'},                    
                            }]
                        }
                    ]
                }
                ]
            };
        }
    }
    );
    registerWidgetStyle('media-text:image', {
        name: 'Space', 
        identifier:'space',
        display:'inline-block',
        options:[
            {identifier:'small',
             name: 'Small',
             cssStyle:`
                background: #cccccc;
                .dme-w-list .dme-block-container{
                    padding: 5px;
                }
             `
          },
          {identifier:'big',
             name: 'Big',
             cssStyle:`
                background: #333333;
                color: white;
                .dme-w-list .dme-block-container{
                    padding: 10px;
                }
             `
          }
        ]
    })
}

export default register ;