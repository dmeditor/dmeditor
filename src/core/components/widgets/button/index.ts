import { registerWidget, registerWidgetStyle } from "..";
import buttonWidget from "./definition";
import { Button } from "./Button";

const register = () =>{
    registerWidget(buttonWidget, Button )
    registerWidgetStyle('button',
    {
        identifier:'style',
        display:'inline-block',
        name: 'Style',
        options: [
            {identifier: 'primary',
             name: 'Primary',
             cssClasses: {root: 'bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'},
             cssStyle:''
            }
        ]
    });
}

export default register ;