import {blockManager} from './BlockManager';
import { Paragraph, ParagraphSettings } from './blocks/Paragraph';
import { Table, TableSettings } from './blocks/Table';

blockManager.registerBlock('p', (content:any)=><Paragraph content={content} /> );
blockManager.registerBlockSetting('p', (content:any)=><ParagraphSettings /> );

blockManager.registerBlock('table', (content:any)=><Table content={content} /> );
blockManager.registerBlockSetting('table', (content:any)=><TableSettings /> );