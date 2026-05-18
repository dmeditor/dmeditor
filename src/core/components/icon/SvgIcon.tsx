import * as React from 'react';
import { css } from '@emotion/css';
import { Title } from '@mui/icons-material';

import { IconDefinition } from '../../utils/register';

// interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
interface SvgIconProps {
  prefix?: string;
  name: string;
  size?: number | string;
  spin?: boolean;
}

const SvgIcon = (props: SvgIconProps) => {
  const { prefix = 'dme-icon', name, size = 16, spin } = props;

  const getStyle = () => {
    return {
      maxWidth: size,
      maxHeight: size,
      animation: spin ? 'spin 2s linear infinite' : 'none',
    };
  };
  if (name.startsWith('data:')) {
    return <img src={name} style={getStyle()} />;
  } else if (name.startsWith('<svg')) {
    // svg string
    return (
      <div
        dangerouslySetInnerHTML={{ __html: name }}
        className={css`
          & > svg {
            ${getStyle()}
          }
        `}
      />
    );
  } else {
    // icon name
    const SvgComponent = IconDefinition.icons.find((icon) => icon.name === name)?.component;

    return SvgComponent ? <SvgComponent style={getStyle()} /> : <Title />;
  }
};

export default SvgIcon;
