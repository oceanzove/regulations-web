import React, {useState} from "react";
import {IMenuSection} from "../../types.ts";
import {ArrowDownIcon, ArrowRightIcon, DragPointIcon} from "../../../../shared/assets/icons";
import styles from "./MenuSection.module.scss";


export const MenuSection = (props: IMenuSection) => {
    const [expanded, setExpanded] = useState(true);
    const {title, items} = props;

    return (
        <div className={styles.menuSection}>
            <div
                onClick={() => setExpanded(!expanded)}
                className={`${styles.header} ${expanded ? styles.expanded : ''}`}
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
            {/*{expanded && items.length > 0 && (*/}
            {/*    <div className={styles.search}>*/}
            {/*        {items.map((item, idx) => (*/}
            {/*            <MenuItem key={idx} item={item}/>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};