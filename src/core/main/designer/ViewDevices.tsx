import { useState } from 'react';
import { LaptopMacOutlined, PhoneIphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DME } from 'dmeditor/core/types';

import { useEditorStore } from '../store';
import { ViewDevicesContainer } from './style';

const devices = [
  {
    identifier: 'pc',
    icon: <LaptopMacOutlined />,
    text: 'Desktop',
  },
  {
    identifier: 'tablet',
    icon: <TabletMacOutlined />,
    text: 'Tablet',
  },
  {
    identifier: 'mobile',
    icon: <PhoneIphoneOutlined />,
    text: 'Mobile',
  },
];

export const ViewDevices = (props: { onChange: (device: string) => void }) => {
  const [device, setDevice] = useState<DME.Device>('pc');

  const select = (v) => {
    setDevice(v);
    props.onChange(v);
  };

  return (
    <ViewDevicesContainer>
      {devices.map((item) => (
        <IconButton
          sx={{ background: device === item.identifier ? '#cccccc' : 'none' }}
          onClick={() => select(item.identifier)}
        >
          {item.icon}
        </IconButton>
      ))}
    </ViewDevicesContainer>
  );
};
