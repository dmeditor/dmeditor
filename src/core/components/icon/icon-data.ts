import { AccessAlarm } from '@mui/icons-material';

interface Icon {
  name: string;
  component: any;
}

const IconDefinition: {
  prefix: string;
  icons: Icon[];
} = {
  prefix: 'dme-icon',
  icons: [
    // { name: 'arrow-down', path: 'M0 0h24v24H0z', viewBox: '0 0 24 24' },
    { name: 'access-alarm', component: AccessAlarm },
  ],
};

const registerIcon = (icon: Icon) => {
  if (IconDefinition.icons.find((i) => i.name === icon.name)) {
    throw new Error(`Icon with name ${icon.name} already exists!`);
  } else {
    IconDefinition.icons.push(icon);
  }
};

export { IconDefinition, registerIcon };
