import type {FC} from 'react';
import {EditorState} from "draft-js";
import {FormatButton} from "../format-button.tsx";
import {TEXT_EDITOR_INLINE_TYPES} from "../../constants.tsx";

type TProps = {
    editorState: EditorState;
    onToggle: (style: string) => void;
};

export const InlineStyleControls: FC<TProps> = ({editorState, onToggle}) => {
    const currentStyle = editorState
        .getCurrentInlineStyle();

    return (
        <>
            { TEXT_EDITOR_INLINE_TYPES.map((type) => (
                <FormatButton
                    key={type.label}
                    isActive={currentStyle.has(type.style)}
                    onToggle={onToggle}
                    style={type.size}
                    typeIcon={type.icon}
                />
            ))};
        </>
    )
};
