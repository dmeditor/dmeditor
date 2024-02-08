import { registerWidget } from "..";
import HeadingWidget from "./definition";
import Heading from "./render";

const registerHeading = ()=>{
    registerWidget(HeadingWidget, Heading)
}

export default registerHeading;