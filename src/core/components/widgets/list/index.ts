import { List } from './List';
import { registerWidget } from "..";
import listWidget from "./definition";

const register = () =>{
    registerWidget(listWidget, List )
}

export default register ;