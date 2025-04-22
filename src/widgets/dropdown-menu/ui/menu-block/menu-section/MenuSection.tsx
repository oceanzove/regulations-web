import React, {useState} from "react";
import {IMenuSection} from "../../../types.ts";
import {ArrowDownIcon, ArrowRightIcon, DragPointIcon} from "../../../../../shared/assets/icons";
import styles from "./MenuSection.module.scss";
import {MenuItem} from "./menu-item";


export const MenuSection = (props: IMenuSection) => {
    const [expanded, setExpanded] = useState(true);
    const {title, items} = props;

    return (
        <div className={`${styles.wrapper} ${expanded ? styles.expanded : ''}`}>
            <div
                onClick={() => setExpanded(!expanded)}
                className={styles.header}
            >
                <DragPointIcon
                    color={'#8692A7'}
                />
                {expanded ?
                    <ArrowDownIcon
                        color={'#8692A7'}
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
            {expanded && items.length > 0 && (
                <div className={styles.items}>
                    {items.map((item, idx) => (
                        <MenuItem key={idx}
                                  label={item.label}
                                  checked={item.checked}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};