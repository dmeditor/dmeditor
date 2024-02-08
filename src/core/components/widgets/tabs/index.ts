import DMTabs from './render';
import TabsWidget from './definition';
import { registerWidget } from '..';

export default ()=>{
    registerWidget(TabsWidget, DMTabs);
}