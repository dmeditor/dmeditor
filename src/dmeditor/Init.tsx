import {blockManager} from './BlockManager';
import { FullImageHandler } from './blocks/FullImage';
import { HeadingHandler } from './blocks/Heading';
import { ParagraphHandler } from './blocks/Paragraph';
import { TableHandler } from './blocks/Table';

blockManager.registerBlockType(ParagraphHandler);

blockManager.registerBlockType(HeadingHandler);

blockManager.registerBlockType(TableHandler);

blockManager.registerBlockType(FullImageHandler);
blockManager.registerBlockType(HeadingHandler);
