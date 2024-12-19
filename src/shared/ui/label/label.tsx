import React from 'react';
import css from './label.module.scss';

interface ILabelProps {
    label?: string;
    fontSize?: string;
    color?: string;
    children?: React.ReactNode;
    id?: string;
}

export const Label = (props: ILabelProps) => {
    const {
        label,
        fontSize,
        color,
        children,
        id,
    } = props;

    return (
        <div className={css.wrapper}>
            <label
                className={css.label}
                style={{
                    fontSize,
                    color,
                }}
                htmlFor={id}
            >
                {label}
            </label>
            <div className={css.children}>
                {children}
            </div>
        </div>
    );
};