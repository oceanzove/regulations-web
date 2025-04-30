import {IDropdownMenuBlock} from "../../types.ts";
import React, {useState} from "react";
import styles from './MenuBlock.module.scss';
import {MenuSection} from "./menu-section";
 import {IconEnum} from "../../../../shared/ui/icon/IconType.tsx";
import {IconButton} from "../../../../shared/ui/icon-button/icon-button.tsx";

export const MenuBlock = (props: IDropdownMenuBlock) => {
    const [expanded, setExpanded] = useState(true);
    const {title, sections} = props;

    return (
        <div className={styles.blockWrapper}>
            <div
                onClick={() => setExpanded(!expanded)}
                className={`${styles.header} ${expanded ? styles.expanded : ''}`}
            >
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

            {expanded && (
                <div className={styles.sections}>
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