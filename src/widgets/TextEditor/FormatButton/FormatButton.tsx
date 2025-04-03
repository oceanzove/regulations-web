import React, { type FC, memo } from "react";
import type { TFormatButtonProps } from "./types";
import styles from './format-button.module.scss';
import {IconButton} from "../../../shared/ui/icon-button/icon-button.tsx";
import {IconType} from "../../../shared/ui/icon/IconType.tsx";
const FormatButtonComponent: FC<TFormatButtonProps> = ({ isActive, onToggle, style, typeIcon }) => {
  return (
    <div
      className={`${styles.formatButton}`}
      onMouseDown={(event) => {
        event.preventDefault();
        onToggle?.(style);
      }}
    >
        <>
            <IconButton isActive={isActive} typeIcon={typeIcon as IconType} />
        </>
    </div>
  );
};

FormatButtonComponent.displayName = "FormatButton";

export const FormatButton = memo(FormatButtonComponent);
