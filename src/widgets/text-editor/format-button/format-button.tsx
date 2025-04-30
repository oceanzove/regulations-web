import React, {type FC, memo} from "react";
import styles from './format-button.module.scss';
import {IconButton} from "../../../shared/ui/icon-button/icon-button.tsx";
import {IconType} from "../../../shared/ui/icon/IconType.tsx";


interface IFormatButtonProps {
    isActive?: boolean;
    onToggle: (style: string) => void;
    size?: string;
    style: string;
    typeIcon: string;
}

const FormatButtonComponent: FC<IFormatButtonProps> = ({isActive, onToggle, style, typeIcon}) => {

    return (
        <div
            className={`${styles.formatButton} ${isActive ? styles.active : ''}`}
            onMouseDown={(event) => {
                event.preventDefault();
                onToggle?.(style);
            }}
        >
            <div className={styles.buttonContainer}>
                <IconButton
                    isActive={isActive}
                    typeIcon={typeIcon as IconType}
                />
            </div>
        </div>
    );
};

FormatButtonComponent.displayName = "FormatButton";

export const FormatButton = memo(FormatButtonComponent);
