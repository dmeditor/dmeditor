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

export enum Display {
  Dropdown = 'dropdown',
  ButtonGroup = 'button-group',
  Radio = 'radio',
  InlineBlock = 'inline-block',
}

export type PageSettingType = 'text' | 'multitext' | 'image' | 'richtext';
