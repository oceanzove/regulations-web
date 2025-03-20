import type { FC } from 'react';

interface ITextEditorProps {
    isInvalid?: boolean;
}

export const TextEditor: FC<ITextEditorProps> = (props) => {
    const {
        isInvalid = false
    } = props;

    return (
        <>
        </>
    )
}

// type TTextEditorProps = {
//     isInvalid?: boolean;
// }
//
// export const TextEditor: FC<TTextEditorProps> = (props) => {
//
// }