import { registerWidget } from "..";
import gridWidget from "./definition";
import { Grid } from "./Grid";

const register = () =>{
    registerWidget(gridWidget, Grid )
}

export default register ;