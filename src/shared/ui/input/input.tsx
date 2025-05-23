import css from './input.module.scss';
import React from "react";

interface IInputProps {
    placeholder?: string;
    width?: number;
    height?: number;
    id?: string;
    value?: string;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: IInputProps) => {
    const {
        placeholder,
        width,
        height,
        id,
        value,
        className,
        onChange,
    } = props;

    return (
        <div className={`${css.wrapper} ${className}`} style={{ width, height }}>
            <div className={css.inputContainer}>
                <input
                    id={id}
                    className={css.inputField}
                    placeholder={placeholder}
                    style={{height}}
                    value={value}
                    onChange={onChange}
                />
            </div>

        </div>
    );
};
