import {memo, type FC, type DetailedHTMLProps, type ButtonHTMLAttributes, type MouseEvent} from "react";
import styles from './button.module.scss';
import {IconType} from "../icon/IconType.tsx";
import {Icon} from "../icon";

export type TButton = "button" | "reset" | "submit";

export interface IButtonProps
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  dataTestId?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  type?: TButton;
  typeIcon?: IconType;
}

const ButtonComponent: FC<IButtonProps> = ({
  className,
  children,
  isActive = false,
  isDisabled = false,
  onClick,
  type = "button",
  typeIcon,
  ...rest
}) => {
  return (
    <button
      // className={clsx("Button", className, {
      //   Button__isDisabled: isDisabled,
      //   Button__isActive: isActive,
      // })}
        className={`${styles.button} ${className} ${isActive ? styles.active : ''}`}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {typeIcon && <Icon type={typeIcon} />}
      <span className={`${typeIcon ? styles.buttonText : ""}`}>{children}</span>
    </button>
  );
};

ButtonComponent.displayName = "Button";

export const Button = memo(ButtonComponent);
