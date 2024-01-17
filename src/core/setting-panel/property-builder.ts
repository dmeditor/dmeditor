import emitter from 'Core/utils/event';

const createAlignProperty = (align: string) => {
  return {
    align: {
      type: String,
      default: align,
    },
  };
}
