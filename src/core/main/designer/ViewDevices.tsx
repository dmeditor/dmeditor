import { useState } from 'react';
import { LaptopMacOutlined, PhoneIphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DME } from 'dmeditor/core/types';

import { dmeConfig } from '../../config';
import { useEditorStore } from '../store';
import { View, ViewDevicesContainer } from './style';

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
        <View.DeviceItem
          selected={device === item.identifier}
          onClick={() => select(item.identifier)}
        >
          <IconButton sx={{ color: '#ffffff' }} size="small">
            {item.icon}
          </IconButton>
        </View.DeviceItem>
      ))}
    </ViewDevicesContainer>
  );
};
