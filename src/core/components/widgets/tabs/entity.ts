export interface EntityTabsBlock {
  value: string;
  level: number;
  settings: {
    align: string;
    color?: string;
    'background-color'?: string;
    'margin-top'?: number;
    padding?: number;
    width?: string | number;
  };
  children: EntityTabsBlock[];
}
