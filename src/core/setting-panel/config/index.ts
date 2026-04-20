import { i18n } from 'dmeditor/core/i18n';

const defaultSettingTabs: { [key: string]: string } = {
  widget: 'Widget',
  get style() {
    return i18n('Style');
  },
};

export { defaultSettingTabs };
