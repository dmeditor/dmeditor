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
  const { buttonType = 'link', styleClasses, onClick } = restProps;
  const Component = getStyledButton(buttonType);

  const buttonProps: {
    href?: string;
  } = {};
  if (buttonType === 'link') {
    buttonProps['href'] = link;
  }
  const handleClick = () => {
    onClick?.();
  };
  return (
    <Component
      {...restProps}
      {...buttonProps}
      disabled={mode === 'edit'}
      className={styleClasses['button'] || '' + ' dme-w-button'}
      onClick={handleClick}
    >
      {value}
    </Component>
  );
};

export { Button };
export default Button;
