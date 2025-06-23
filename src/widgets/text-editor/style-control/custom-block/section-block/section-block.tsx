import React, {FC, useState} from 'react';
import styles from './section-block.module.scss';
import {Editor, EditorState} from "draft-js";
import {CONVERT_HTML_TO_MESSAGE, GET_DECORATOR} from "../../../editor-utils.ts";

interface ISectionBlockProps {
    blockProps: {
        title: string,
        content: string,
    }
}

export const SectionBlock: FC<ISectionBlockProps> = (props) => {
    const {title, content} = props.blockProps;

    const [editorState, setEditorState] = useState(() => {
        const contentState = CONVERT_HTML_TO_MESSAGE(content);
        return EditorState.createWithContent(contentState, GET_DECORATOR());
    });

    return (
        <div>
            <span
                style={{
                    borderRadius: 8,
                    padding: "4px 0",
                    fontWeight: 700,
                    display: "inline-block",
                    // userSelect: "",
                }}
                contentEditable={false}
            >
            {title}
        </span>
            <Editor
                editorState={editorState}
                readOnly={true}
                onChange={(editorState) => {setEditorState(editorState)}}
            />
        </div>
    );
};