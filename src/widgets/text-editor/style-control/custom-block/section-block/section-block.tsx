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

    const [editorState, setEditorState] = useState(EditorState.createWithContent(CONVERT_HTML_TO_MESSAGE(content), GET_DECORATOR()));

    return (
        <div>
            <span
                style={{
                    borderRadius: 8,
                    padding: "4px 12px",
                    fontWeight: 700,
                    margin: "0 4px",
                    display: "inline-block",
                    userSelect: "none",
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