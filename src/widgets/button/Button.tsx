import type { DME } from '../../core/types';
import { EntityButton } from './entity';
import { getStyledButton } from './styled';

interface ButtonProps extends DME.WidgetRenderProps<EntityButton> {
  buttonType: 'link' | 'button';
  onClick?: () => void;
}
const Button = (props: ButtonProps) => {
  const {
    blockNode: {
      data: { value, link },
    },
    mode,
    ...restProps
  } = props;
  const { buttonType = 'link', rootClasses, styleClasses, onClick } = restProps;
  const Component = getStyledButton(buttonType);

  const buttonProps: {
    href?: string;
  } = {};
  if (buttonType === 'link') {
    buttonProps['href'] = link;
  }
  let cls = '';
  if (rootClasses) {
    cls += rootClasses;
  }
  if (styleClasses) {
    cls += ` ${styleClasses}`;
  }
  const handleClick = () => {
    onClick?.();
  };
  return (
    <div>
      <Component
        {...restProps}
        {...buttonProps}
        disabled={mode === 'edit'}
        className={cls}
        onClick={handleClick}
      >
        {value}
      </Component>
    </div>
  );
};

export { Button };
export default Button;
