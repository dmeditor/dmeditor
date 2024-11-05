import React from 'react';

interface HeadingComponentProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  level?: number;
}

export const HeadingComponent: React.FC<HeadingComponentProps> = ({
  level: number = 2,
  ...restProps
}) => {
  return React.createElement(
    `h${number}`,
    {
      ...restProps,
      style: restProps.style,
      suppressContentEditableWarning: true,
    },
    restProps.children,
  );
};
