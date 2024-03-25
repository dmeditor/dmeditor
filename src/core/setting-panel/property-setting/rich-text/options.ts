const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];
const FONT_FAMILY_TYPES = [
  // { name: 'Arial', options: '400' },
  // { name: 'Arial Black', options: '400,400i,700,700i' },
  // { name: 'Courier New', options: '400,400i,700,700i' },
  // { name: 'Tahoma', options: '400,400i,700,700i' },
  // { name: 'Times New Roman', options: '400,400i,700,700i' },
  // { name: 'Verdana', options: '400,700' },
  { value: 'arial', label: 'Arial' },
  { value: 'times new roman', label: 'Times New Roman' },
  { value: 'courier new', label: 'Courier New' },
  { value: 'tahoma', label: 'Tahoma' },
  { value: 'georgia', label: 'Georgia' },
  { value: 'verdana', label: 'Verdana' },
];

const FONT_SIZE_TYPES = [
  { value: '12px', label: '12px' },
  { value: '14px', label: '14px' },
  { value: '16px', label: '16px' },
  { value: '18px', label: '18px' },
  { value: '20px', label: '20px' },
  { value: '24px', label: '24px' },
  { value: '28px', label: '28px' },
  { value: '32px', label: '32px' },
  { value: '36px', label: '36px' },
  { value: '40px', label: '40px' },
  { value: '48px', label: '48px' },
  { value: '56px', label: '56px' },
  { value: '64px', label: '64px' },
  { value: '72px', label: '72px' },
];

export { LIST_TYPES, TEXT_ALIGN_TYPES, FONT_FAMILY_TYPES, FONT_SIZE_TYPES };
