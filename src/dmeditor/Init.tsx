import {blockManager} from './BlockManager';
import { FullImage, FullImageHandler, FullImageSettings } from './blocks/FullImage';
import { HeadingHandler } from './blocks/Heading';
import { Paragraph, ParagraphHandler, ParagraphSettings } from './blocks/Paragraph';
import { Table, TableHandler, TableSettings } from './blocks/Table';

blockManager.registerBlockType(ParagraphHandler);

blockManager.registerBlockType(HeadingHandler);

blockManager.registerBlockType(TableHandler);

blockManager.registerBlockType(FullImageHandler);
blockManager.registerBlockType(HeadingHandler);
