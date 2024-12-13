import css from './RegulationEditor.module.scss';
import MDEditor from "@uiw/react-md-editor";
import React, {useRef} from "react";
import {IRegulation} from "../../../../../entities/regulation/model/slices/regulationSlice.ts";
import {Label} from "../../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../../shared/ui/input/input.tsx";

interface IRegulationEditorProps {
    activeRegulation: IRegulation,
    updateTitle: (id: string, title: string) => void,
    updateContent: (id: string ,content: string) => void,
}
export const RegulationEditor = (props: IRegulationEditorProps) => {
    const { activeRegulation, updateContent, updateTitle } = props;

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

    const onTitleChange = (title: string) => {
        updateTitle(activeRegulation.id, title);
    };

    return (
        <div className={css.wrapper}>
            <Label label={'Название'}>
                <Input
                    value={activeRegulation.title}
                    onChange={onTitleChange}
                />
            </Label>
            <MDEditor
                data-color-mode="light"
                value={activeRegulation.content}
                onChange={onContentChange}
            />
        </div>
    );
};