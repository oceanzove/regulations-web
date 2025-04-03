import { memo, type FC } from "react";
import styles from './icon-button.module.scss';
import type { MouseEvent } from "react";
import {Button, IButtonProps} from "../button";
import {IconType} from "../icon/IconType.tsx";
import {Icon} from "../icon";

export interface IIconButtonProps extends IButtonProps {
    className?: string;
    isActive?: boolean;
    isDisabled?: boolean;
    onClick?: (event: MouseEvent) => void;
    typeIcon: IconType;
}

const IconButtonComponent: FC<IIconButtonProps> = ({
                                                       className,
                                                       isActive = false,
                                                       isDisabled = false,
                                                       onClick,
                                                       typeIcon,
                                                       ...rest
                                                   }) => {
    return (
        <Button
            className={`${styles.iconButton} ${className}`}
            isActive={isActive}
            isDisabled={isDisabled}
            onClick={onClick}
            {...rest}
        >
            <Icon type={typeIcon} />
        </Button>
    );
};

IconButtonComponent.displayName = "IconButton";

export const IconButton = memo(IconButtonComponent);
