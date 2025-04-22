import {IDropdownMenuBlock} from "../../types.ts";
import React, {useState} from "react";
import styles from "../DropdownMenu.module.scss";
import {ArrowDownIcon, ArrowRightIcon} from "../../../../shared/assets/icons";
import {MenuSection} from "./menu-section";

export const MenuBlock = (props: IDropdownMenuBlock) => {
    const [expanded, setExpanded] = useState(true);
    const {title, sections} = props;

    return (
        <div className={styles.wrapper}>
            <div
                onClick={() => setExpanded(!expanded)}
                className={`${styles.header} ${expanded ? styles.expanded : ''}`}
            >
                {expanded ?
                    <ArrowDownIcon
                    />
                    :
                    <ArrowRightIcon
                        color={'#8692A7'}
                    />
                }
                <div
                    className={styles.title}
                >
                    {title}
                </div>
                <div
                    className={styles.statusDot}
                />
            </div>

            {expanded && (
                <div className={styles.dropdownMenu}>
                    {sections.map((section, index) => (
                        <MenuSection
                            key={index}
                            title={section.title}
                            items={section.items}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};