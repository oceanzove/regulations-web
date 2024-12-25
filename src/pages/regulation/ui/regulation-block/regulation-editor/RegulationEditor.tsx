import css from './RegulationEditor.module.scss';
import MDEditor from "@uiw/react-md-editor";
import React, {useEffect, useState} from "react";
import {Label} from "../../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../../shared/ui/input/input.tsx";
import {MainButton} from "../../../../../shared/ui/button/button.tsx";
import {regulationApi} from "../../../../../entities/regulation/api/api.ts";
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";

interface IRegulationEditorProps {
    activeRegulation: IRegulation,
    updateTitle: (id: string, title: string) => void,
    updateContent: (id: string ,content: string) => void,
}
export const RegulationEditor = (props: IRegulationEditorProps) => {
    const { activeRegulation, updateContent, updateTitle } = props;

    const [localTitle, setLocalTitle] = useState(activeRegulation.title);
    const [localContent, setLocalContent] = useState(activeRegulation.content);

    useEffect(() => {
        setLocalTitle(activeRegulation.title);
        setLocalContent(activeRegulation.content);
    }, [activeRegulation]);

    const [update] = regulationApi.useUpdateMutation();

    const onSaveClick = () => {
        if (localTitle !== activeRegulation.title) {
            updateTitle(activeRegulation.id, localTitle);
        }
        if (localContent !== activeRegulation.content) {
            updateContent(activeRegulation.id, localContent);
        }
        if (localTitle !== activeRegulation.title || localContent !== activeRegulation.content) {
            update({ regulation: activeRegulation.id, title: localTitle, content: localContent})
        }
    };

    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <Label label={'Название'}>
                    <Input
                        value={localTitle}
                        onChange={(content) => setLocalTitle(content || '')}
                    />
                </Label>
                <MDEditor
                    data-color-mode="light"
                    value={localContent}
                    onChange={(content) => setLocalContent(content || '')}
                />
                <MainButton text={'Сохранить'} onClick={onSaveClick}/>
            </div>
        </div>
    );
};