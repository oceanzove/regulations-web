import css from './textArea.module.scss';
import React, {useEffect, useRef} from "react";

interface IInputProps {
    placeholder?: string;
    width?: number;
    height?: number;
    id?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = (props: IInputProps) => {
    const {
        placeholder,
        width,
        height,
        id,
        value,
        onChange,
    } = props;

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height
            textarea.style.height = `${textarea.scrollHeight}px`; // Set to scrollHeight
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(event);
        }
        adjustHeight();
    };

    return (
        <div className={css.wrapper} style={{ width, height }}>
            <div className={css.inputContainer}>
                <textarea
                    id={id}
                    className={css.textAreaField}
                    placeholder={placeholder}
                    style={{height}}
                    value={value}
                    onChange={handleChange}
                />
            </div>

        </div>
    );
};
