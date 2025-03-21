import type {FC} from 'react';

type TFormatButton = {
    isActive?: boolean;
    onToggle: (style: string) => void;
    size?: string,
    style: string,
    typeIcon: string,
}

export const FormatButton: FC<TFormatButton> = ({isActive, onToggle, size, style, typeIcon}) => {
    return (
        <div className="FormaetButton" onMouseDown={event => {
            event.preventDefault();
            onToggle?.(style);

        }}>
            <button>

            </button>
            {/*<IconButton>*/}

            {/*</IconButton>*/}
        </div>
    )
};