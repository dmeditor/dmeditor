import React, { ReactElement } from 'react';

import { BlockHandler } from './blocktype';

var blockHandlers: { [key: string]: BlockHandler } = {};

var blockHandlerArray: Array<BlockHandler> = [];

export const blockManager = {
  registerBlockType: (handler: BlockHandler) => {
    blockHandlers[handler.type] = handler;
  },

  getBlockType: (type: string): BlockHandler => {
    return blockHandlers[type];
  },

  getBlockTypes: () => {
    return blockHandlers;
  },
};
