import {memo} from "react";
import type {FC} from "react";
import type {TIconProps} from "../types";

const Component: FC<TIconProps> = ({height = 16, width = 4, ...props}) => (
    <>
        <svg
            width={width}
            height={height}
            viewBox="0 0 4 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M2 0.5C2.82843 0.5 3.5 1.17157 3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.500001 2C0.500001 1.17157 1.17157 0.5 2 0.5Z"
                fill="#8692A7"/>
            <path
                d="M2 6.5C2.82843 6.5 3.5 7.17157 3.5 8C3.5 8.82843 2.82843 9.5 2 9.5C1.17157 9.5 0.5 8.82843 0.5 8C0.5 7.17157 1.17157 6.5 2 6.5Z"
                fill="#8692A7"/>
            <path
                d="M2 12.5C2.82843 12.5 3.5 13.1716 3.5 14C3.5 14.8284 2.82843 15.5 2 15.5C1.17157 15.5 0.5 14.8284 0.5 14C0.5 13.1716 1.17157 12.5 2 12.5Z"
                fill="#8692A7"/>
        </svg>
    </>

);

export const ItemOptionIcon = memo(Component);
