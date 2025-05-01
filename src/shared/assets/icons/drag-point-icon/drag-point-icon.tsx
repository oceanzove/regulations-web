import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const Component: FC<TIconProps> = ({ height =  6, width = 12, color = 'black', ...props }) => (
    <>
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M12 4.75C12 4.33579 11.6776 4 11.28 4H0.72C0.322354 4 0 4.33579 0 4.75C0 5.16421 0.322354 5.5 0.72 5.5H11.28C11.6776 5.5 12 5.16421 12 4.75Z"
                  fill={color}/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M12 1.25C12 0.835786 11.6776 0.5 11.28 0.5H0.72C0.322354 0.5 0 0.835786 0 1.25C0 1.66421 0.322354 2 0.72 2H11.28C11.6776 2 12 1.66421 12 1.25Z"
                  fill={color}/>
        </svg>

    </>

);

export const DragPointIcon = memo(Component);
