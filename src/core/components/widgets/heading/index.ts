import { registerWidget } from "..";
import HeadingWidget from "./definition";
import Heading from "./Heading";

const registerHeading = ()=>{
    registerWidget(HeadingWidget, Heading)
}

export default registerHeading;