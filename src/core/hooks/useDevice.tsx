import { useEffect, useState } from 'react';

import { dmeConfig } from '../config';

let _device: DeviceType = '';
export const setDevice = (d: DeviceType) => {
  _device = d;
};
export type DeviceType = '' | 'mobile' | 'tablet';

export const useDevice = (): DeviceType => {
  let deviceWidth = dmeConfig.general.deviceWidth;

  const [device, setDevice] = useState('');
  const setCurrentDevice = () => {
    let currentDevice = 'desktop';
    if (window.matchMedia('(max-device-width: ' + deviceWidth.mobile + 'px)').matches) {
      currentDevice = 'mobile';
    } else if (window.matchMedia('(max-device-width: ' + deviceWidth.tablet + 'px)').matches) {
      currentDevice = 'tablet';
    }
    setDevice(currentDevice);
  };

  useEffect(() => {
    setCurrentDevice();
    window.addEventListener('resize', setCurrentDevice);
    return () => {
      window.removeEventListener('resize', setCurrentDevice);
    };
  }, []);

  if (_device !== '') {
    return _device;
  }
  return device as DeviceType;
};
