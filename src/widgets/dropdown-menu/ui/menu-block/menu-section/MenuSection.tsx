import React, {useState} from "react";
import {IMenuSection} from "../../../types.ts";
import {DragPointIcon} from "../../../../../shared/assets/icons";
import styles from "./MenuSection.module.scss";
import {MenuItem} from "./menu-item";
import {Icon} from "../../../../../shared/ui/icon";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {IconButton} from "../../../../../shared/ui/icon-button/icon-button.tsx";


export const MenuSection = (props: IMenuSection) => {
    const [expanded, setExpanded] = useState(true);
    const {title, items} = props;

    return (
        <div className={`${styles.sectionWrapper} ${expanded ? styles.expanded : ''}`}>
            <div
                onClick={() => setExpanded(!expanded)}
                className={styles.header}
            >
                <DragPointIcon
                    color={'#8692A7'}
                />

                <div className={styles.buttonContainer}>
                    {expanded ?
                        <IconButton typeIcon={IconEnum.ARROW_DOWN}
                                    onClick={() => setExpanded(!expanded)}
                        />
                        :
                        <IconButton typeIcon={IconEnum.ARROW_RIGHT}
                                    onClick={() => setExpanded(!expanded)}
                        />
                    }
                </div>

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