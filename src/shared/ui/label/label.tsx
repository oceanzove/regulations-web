import React from 'react';
import styles from './label.module.scss';

interface ILabelProps {
    label?: string;
    fontSize?: string;
    color?: string;
    children?: React.ReactNode;
    id?: string;
    className?: string,
    childClassName?: string,
}

export const Label = (props: ILabelProps) => {
    const {
        id,
        label,
        color,
        className,
        childClassName,
        children,
        fontSize,
    } = props;

    return (
        <div className={`${styles.labelWrapper} ${className}`}>
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
            <div className={`${styles.children} ${childClassName}`}>
                {children}
            </div>
        </div>
    );
};