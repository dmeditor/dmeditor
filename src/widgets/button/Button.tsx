import type { DME } from '../../core/types';
import { getWidgetStyleClass } from '../../core/utils';
import { EntityButton } from './entity';
import { getStyledButton } from './styled';

interface ButtonProps extends DME.WidgetRenderProps<EntityButton> {
  buttonType: 'link' | 'button';
  onClick?: () => void;
}
const Button = (props: ButtonProps) => {
  const {
    blockNode: {
      data: { value, link, settings },
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
  if (settings?.textAlign) {
    buttonProps['textAlign'] = settings.textAlign;
  }
  const handleClick = () => {
    onClick?.();
  };
  return (
    <Component
      {...restProps}
      {...buttonProps}
      disabled={mode === 'edit'}
      className={getWidgetStyleClass(styleClasses, 'button')}
      onClick={handleClick}
    >
      {styleClasses['before-icon'] && (
        <i className={getWidgetStyleClass(styleClasses, 'before-icon')} />
      )}
      {value}
      {styleClasses['after-icon'] && (
        <i className={getWidgetStyleClass(styleClasses, 'after-icon')} />
      )}
    </Component>
  );
};

export { Button };
export default Button;
