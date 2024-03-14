import { InsertLink as LinkIcon } from '@mui/icons-material';
import { registerWidget } from 'dmeditor/components/widgets';
import { registerSettingComponent } from 'dmeditor/setting-panel/property-setting';

import { registerIcon } from '../../icon/icon-data';
import { Link, LinkDefinition } from './Link';
import { LinkInput } from './settings';

export default () => {
  registerWidget(LinkDefinition, { render: Link });
  registerIcon({ name: 'link', component: LinkIcon });
  registerSettingComponent('link-input', LinkInput);
};
