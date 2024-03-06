import emitter from 'dmeditor/utils/event';

const createAlignProperty = (align: string) => {
  return {
    align: {
      type: String,
      default: align,
    },
  };
};
