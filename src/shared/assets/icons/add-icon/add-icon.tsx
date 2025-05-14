import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const Component: FC<TIconProps> = ({ height = 11.5, width = 11.5, color = 'White', ...props }) => (
    <>
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V17C12.75 17.4142 12.4142 17.75 12 17.75C11.5858 17.75 11.25 17.4142 11.25 17V7C11.25 6.58579 11.5858 6.25 12 6.25Z"
                  fill={color}/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M17.75 12C17.75 12.4142 17.4142 12.75 17 12.75L7 12.75C6.58579 12.75 6.25 12.4142 6.25 12C6.25 11.5858 6.58579 11.25 7 11.25L17 11.25C17.4142 11.25 17.75 11.5858 17.75 12Z"
                  fill={color}/>
        </svg>
    </>

);

export const AddIcon = memo(Component);
