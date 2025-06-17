import React, {
    memo,
    type FC,
    type DetailedHTMLProps,
    type ButtonHTMLAttributes,
    type MouseEvent,
} from "react";
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
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
            className={`${styles.button} ${className ? className : ''} ${isActive ? styles.active : ''} ${isDisabled ? styles.disabled : ''}`}
            disabled={isDisabled}
            onClick={onClick}
            type={type}
            {...rest}
        >
            {typeIcon && <Icon className={styles.icon} type={typeIcon}/>}
            <div className={`${typeIcon ? styles.buttonText : ""}`}>{children}</div>
        </button>
    );
};

ButtonComponent.displayName = "Button";

export const Button = memo(ButtonComponent);
