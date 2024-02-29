import * as React from 'react';
import { Title } from '@mui/icons-material';

import { IconDefinition } from './icon-data';

// interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
interface SvgIconProps {
  prefix?: string;
  name: string;
  size?: number | string;
  spin?: boolean;
}

const SvgIcon = (props: SvgIconProps) => {
  const { prefix = 'dme-icon', name, size = 16, spin } = props;
  const SvgComponent = IconDefinition.icons.find((icon) => icon.name === name)?.component;

  const getStyle = () => {
    let s = `${size}`;
    s = `${s}`.replace('px', '');
    return {
      width: s,
      height: s,
      animation: spin ? 'spin 2s linear infinite' : 'none',
    };
  };
  return SvgComponent ? <SvgComponent style={getStyle()} /> : <Title />;
};

export default SvgIcon;
