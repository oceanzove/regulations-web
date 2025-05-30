import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const Component: FC<TIconProps> = ({ height = 8.25, width = 14.25, color = '#8692A7', ...props }) => (
    <>
        <svg
            width={width}
            height={height}
            viewBox={`0 0 7 10`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M0.96967 0.46967C1.26256 0.176777 1.73744 0.176777 2.03033 0.46967L6.03033 4.46967C6.32322 4.76256 6.32322 5.23744 6.03033 5.53033L2.03033 9.53033C1.73744 9.82322 1.26256 9.82322 0.96967 9.53033C0.676777 9.23744 0.676777 8.76256 0.96967 8.46967L4.43934 5L0.96967 1.53033C0.676776 1.23744 0.676776 0.762563 0.96967 0.46967Z"
                  fill={color}/>
        </svg>
    </>

);

export const ArrowRightIcon = memo(Component);
