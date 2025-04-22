import React, {useState} from "react";
import styles from './MenuItem.module.scss';
import {IMenuItem} from "../../../../types.ts";


export const MenuItem = (props: IMenuItem) => {
    const [checked, setChecked] = useState(props.checked);
    return (
        <div className={styles.wrapper}>
            <div className={styles.checkbox}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                />
            </div>

            <div className={styles.label}>{props.label}</div>
        </div>
    );
};
