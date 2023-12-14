import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes } from 'react';
import { useHover } from 'shared/lib/hooks/useHover/useHover';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonThemes;
    disabled?: boolean;
    helpInfo?: string;
}

export enum ButtonThemes {
    BLUE_SOLID = 'blueSolid',
    BLUE_BORDER = 'blueBorder',
    CLEAR = 'clear',
    CLEAR_BLUE = 'clearBlue',
    ICON = 'icon',
    WHITE_ROUND = 'whiteRound',
    CLEAR_BLACK = 'clearBlack',
    GREEN_SOLID = 'greenSolid',
    RED_BORDER = 'redBorder',
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    disabled = false,
    theme = ButtonThemes.BLUE_SOLID,
    helpInfo,
    ...otherProps
  } = props;

  const [isHover, bindHover] = useHover();

  return (
    <button
      type="button"
      {...bindHover}
      disabled={disabled}
      className={classNames(cls.button, {
        [cls.disabled]: disabled,
      }, [className, cls[theme], cls.tooltiptext])}
      {...otherProps}
    >
      {children}
      {helpInfo && isHover
        ? <span className={cls.tooltip}>{helpInfo}</span>
        : null}
    </button>
  );
};
