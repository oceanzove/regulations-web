import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const Component: FC<TIconProps> = ({ height = 15, width = 15, color = '#8692A7', ...props }) => (
    <>
        <svg
            width={width}
            height={height}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M15.1149 0.884423C15.6275 1.39699 15.6275 2.22801 15.1149 2.74058L2.74058 15.1149C2.22801 15.6275 1.39699 15.6275 0.884422 15.1149C0.371859 14.6024 0.37186 13.7714 0.884422 13.2588L13.2588 0.884423C13.7714 0.37186 14.6024 0.37186 15.1149 0.884423Z"
                  fill={color}/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M15.1149 15.1149C14.6024 15.6275 13.7714 15.6275 13.2588 15.1149L0.884422 2.74058C0.371859 2.22801 0.371859 1.39699 0.884422 0.884422C1.39699 0.371859 2.22801 0.37186 2.74058 0.884422L15.1149 13.2588C15.6275 13.7714 15.6275 14.6024 15.1149 15.1149Z"
                  fill={color}/>
        </svg>
    </>

);

export const CrossIcon = memo(Component);
