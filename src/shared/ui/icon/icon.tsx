import React, {memo, useEffect, useRef, type FC, type DOMAttributes} from "react";
import {type IconType, iconTypes} from "./IconType.tsx";
import styles from './icon.module.scss';

interface IIconProps extends DOMAttributes<HTMLSpanElement> {
  className?: string;
  height?: number;
  size?: number;
  type: IconType;
  width?: number;
}

const IconComponent: FC<IIconProps> = ({
  className,
  height,
  width,
  size,
  type,
  ...rest
}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const getIcon = (type: string): React.ReactNode => {
      const element = iconTypes.get(type);
      if (element === undefined) {
        throw new Error('type of icon not found');
      }
      return element;
  };

  const formatToStringWithPx = (value: number): string => {
    return value.toString() + "px";
  };

  useEffect(() => {
    if (iconRef.current) {
      if (size && !height && !width) {
        iconRef.current.style.setProperty("--icon-height", formatToStringWithPx(size));
        iconRef.current.style.setProperty("--icon-width", formatToStringWithPx(size));
      } else if (!size && height && width) {
        iconRef.current.style.setProperty("--icon-height", formatToStringWithPx(height));
        iconRef.current.style.setProperty("--icon-width", formatToStringWithPx(width));
      }
    }
  }, [height, size, width]);

  return (
    <div
      className={`${styles.icon} ${className}`}
      ref={iconRef}
      {...rest}
    >
      {getIcon(type)}
    </div>
  );
};

IconComponent.displayName = "Icon";

export const Icon = memo(IconComponent);
