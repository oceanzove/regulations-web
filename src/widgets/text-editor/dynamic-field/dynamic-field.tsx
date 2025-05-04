import React from "react";
import styles from './dynamic-field.module.scss';


export const DynamicField = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className={styles.dynamicField} contentEditable={false}>
            {children}
        </span>
    );
};