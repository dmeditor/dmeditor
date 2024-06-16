export enum Mode {
  Edit = 'edit',
  View = 'view',
}

export enum Category {
  Widget = 'widget',
  Container = 'container',
  Mixed = 'mixed',
  Layout = 'layout',
  Section = 'section',
}

export type Display = 'dropdown' | 'button-group' | 'radio' | 'inline-block';

export type PageSettingType = 'text' | 'multitext' | 'image' | 'richtext';
