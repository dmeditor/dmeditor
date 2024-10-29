export const Mode = {
  edit: 'edit',
  view: 'view',
};
export type TMode = keyof typeof Mode;

export enum Category {
  Widget = 'widget',
  Container = 'container',
  Mixed = 'mixed',
  Layout = 'layout',
  Section = 'section',
}

export type Display = 'dropdown' | 'button-group' | 'radio' | 'inline-block';

export type PageSettingType = 'text' | 'multitext' | 'image' | 'richtext' | 'checkbox';
