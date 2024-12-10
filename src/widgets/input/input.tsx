import css from './input.module.scss';

interface InputProps {
    placeholder?: string;
    width?: number;
    height?: number;
    id?: string;
}

export const Input = (props: InputProps) => {
    const {
        placeholder,
        width,
        height,
        id,
    } = props;

    return (
        <div className={css.wrapper} style={{ width, height }}>
            <div className={css.inputContainer}>
                <input
                    id={id}
                    className={css.inputField}
                    placeholder={placeholder}
                    style={{ height }}
                />
            </div>

        </div>
    );
};