import type {FC} from 'react';
import {EditorState} from "draft-js";
import {FormatButton} from "../format-button.tsx";
import {TEXT_EDITOR_BLOCK_TYPES} from "../../constants.tsx";

type TProps = {
    editorState: EditorState;
    onToggle: (style: string) => void;
};

export const BlockStyleControls: FC<TProps> = ({editorState, onToggle}) => {
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <>
            { TEXT_EDITOR_BLOCK_TYPES.map((type) => (
                <FormatButton
                    key={type.label}
                    isActive={type.style === blockType}
                    onToggle={onToggle}
                    style={type.size}
                    typeIcon={type.icon}
                />
            ))};
        </>
    )
};
