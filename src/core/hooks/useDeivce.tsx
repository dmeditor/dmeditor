import { useEffect, useState } from 'react';

import { dmeConfig } from '../config';

let _device: DeviceType = '';
export const setDevice = (d: DeviceType) => {
  _device = d;
}
export type DeviceType = '' | 'mobile' | 'tablet';

export const useDevice = (): DeviceType => {
  let deviceWidth = dmeConfig.general.deviceWidth;

  const [device, setDevice] = useState('');
  const setCurrentDevice = () => {
    const width = window.innerWidth;
    let currentDevice = '';
    if (width <= deviceWidth.mobile) {
      currentDevice = 'mobile';
    } else if (width <= deviceWidth.tablet) {
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
