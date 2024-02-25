export interface EntityText {
  value: Array<{
    type: string;
    children: Array<{
      text: string;
      bold?: boolean;
      italic?: boolean;
      code?: boolean;
    }>;
    align?: string;
  }>;
}
