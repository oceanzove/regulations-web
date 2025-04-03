import React from 'react';
import css from './main-button.module.scss';

interface IMainButtonProps {
    text: string;
    width?: number;
    height?: number;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const MainButton = (props: IMainButtonProps) => {
    const {
        text, width, height, onClick, disabled,
    } = props;
    return (
        <button
            className={`${css.main_button} ${disabled ? css.disabled : ''}`}
            type="button"
            onClick={onClick}
            style={{
                width, height,
            }}
        >
            {text}
        </button>
    );
};