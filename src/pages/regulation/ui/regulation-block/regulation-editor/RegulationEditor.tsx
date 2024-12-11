import css from './RegulationEditor.module.scss';
import MDEditor from "@uiw/react-md-editor";
import React, {useRef} from "react";
import {IRegulation} from "../../../../../entities/regulation/model/slices/regulationSlice.ts";

interface IRegulationEditorProps {
    activeRegulation: IRegulation,
    updateContent: (id: string ,content: string) => void,
}
export const RegulationEditor = (props: IRegulationEditorProps) => {
    const { activeRegulation, updateContent } = props;

    // Используем useRef для хранения состояния контента и избегания ненужных перерисовок
    const editorRef = useRef<string>(activeRegulation.content);

    const onContentChange = (content: string | undefined) => {
        if (content) {
            if (content !== editorRef.current) {
                editorRef.current = content;
                updateContent(activeRegulation.id, content);
            }
        }
    };

    return (
        <div className={css.wrapper}>
            <MDEditor
                data-color-mode="light"
                value={activeRegulation.content}
                onChange={onContentChange}
            />
        </div>
    );
};