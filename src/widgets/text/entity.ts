export interface EntityText {
  value: Array<{
    type: string;
    children: Array<{ text: string }>;
  }>;
}

const initialTextEntity = (): EntityText => {
  return {
    value: [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ],
  };
};

export { initialTextEntity };
