import css from './input.module.scss';
import React from "react";
import {notificationSuccess} from "../../../widgets/notifications/callNotification.tsx";

interface IInputProps {
    placeholder?: string;
    width?: number;
    height?: number;
    id?: string;
    value?: string;
    type?: string;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    readOnly?: boolean;
    showCopyButton?: boolean;
}

export const Input = (props: IInputProps) => {
    const {
        placeholder,
        width,
        height,
        id,
        value,
        className,
        type,
        disabled,
        onChange,
        showCopyButton,
        readOnly,
    } = props;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value ? value : '');
        notificationSuccess('Успешно скопировано');
    };

    return (
        <div className={`${css.wrapper} ${className}`} style={{ width, height }}>
            <div className={css.inputContainer}>
                <input
                    type={type}
                    id={id}
                    disabled={disabled}
                    className={css.inputField}
                    placeholder={placeholder}
                    style={{height}}
                    value={value}
                    readOnly={readOnly}
                    onChange={onChange}
                />
                {showCopyButton && readOnly && (
                    <button
                        className={css.copyButton}
                        onClick={handleCopy}
                        type="button"
                    >
                        📋
                    </button>
                )}
            </div>

        </div>
    );
};
