import {blockManager} from './BlockManager';
import { FullImage, FullImageSettings } from './blocks/FullImage';
import { Paragraph, ParagraphSettings } from './blocks/Paragraph';
import { Table, TableSettings } from './blocks/Table';

blockManager.registerBlock('p', (content:any)=><Paragraph content={content} /> );
blockManager.registerBlockSetting('p', (content:any, onSetting: any)=><ParagraphSettings content={content} onSetting={onSetting} /> );


blockManager.registerBlock('table', (content:any)=><Table content={content} /> );
blockManager.registerBlockSetting('table', (content:any, onSetting:any)=><TableSettings content={content} onSetting={onSetting} /> );


blockManager.registerBlock('full_image', (content:any)=><FullImage content={content} /> );
blockManager.registerBlockSetting('full_image', (content:any, onSetting: any)=><FullImageSettings content={content} onSetting={onSetting} /> );
