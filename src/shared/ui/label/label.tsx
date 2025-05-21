import React from 'react';
import styles from './label.module.scss';

interface ILabelProps {
    label?: string;
    fontSize?: string;
    color?: string;
    children?: React.ReactNode;
    id?: string;
    className?: string,
}

export const Label = (props: ILabelProps) => {
    const {
        id,
        label,
        color,
        className,
        children,
        fontSize,
    } = props;

    return (
        <div className={`${styles.wrapper} ${className}`}>
            <label
                className={styles.label}
                style={{
                    fontSize,
                    color,
                }}
                htmlFor={id}
            >
                {label}
            </label>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    );
};