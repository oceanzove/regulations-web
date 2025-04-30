import React from "react";
import styles from "./DropdownMenu.module.scss";
import {IDropdownMenuProps} from "../types.ts";
import {MenuBlock} from "./menu-block";


export const DropdownMenu = (props: IDropdownMenuProps) => {
    return (
        <div className={styles.dropdownMenuWrapper}>
            {props.blocks.map((section, index) => (
                <MenuBlock
                    key={index}
                    title={section.title}
                    sections={section.sections}
                />
            ))}
        </div>
    );
};