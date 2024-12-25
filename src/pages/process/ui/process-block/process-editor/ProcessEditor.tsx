import css from './ProcessEditor.module.scss';
import React, {useEffect, useState} from "react";
import {Label} from "../../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../../shared/ui/input/input.tsx";
import {MainButton} from "../../../../../shared/ui/button/button.tsx";
import {IProcess} from "../../../../../entities/process/api/types.ts";

interface IProcessEditorProps {
    activeProcess: IProcess,
    // updateTitle: (id: string, title: string) => void,
    // updateContent: (id: string ,content: string) => void,
}

export const ProcessEditor = (props: IProcessEditorProps) => {
    const { activeProcess: activeProcess } = props;

    const [localTitle, setLocalTitle] = useState(activeProcess.title);
    const [localDescription, setLocalDescription] = useState(activeProcess.description);

    useEffect(() => {
        setLocalTitle(activeProcess.title);
        setLocalDescription(activeProcess.description);
    }, [activeProcess]);

    // const [update] = processApi.useUpdateMutation();

    // const onSaveClick = () => {
    //     if (localTitle !== activeProcess.title) {
    //         updateTitle(activeProcess.id, localTitle);
    //     }
    //     if (localDescription !== activeProcess.content) {
    //         updateContent(activeProcess.id, localDescription);
    //     }
    //     if (localTitle !== activeProcess.title || localDescription !== activeProcess.content) {
    //         update({ regulation: activeProcess.id, title: localTitle, content: localDescription})
    //     }
    // };

    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <Label label={'Название'}>
                    <Input
                        value={localTitle}
                        onChange={(content) => setLocalTitle(content || '')}
                    />
                </Label>
                <Label label={'Описание'}>
                    <Input
                        value={localDescription}
                        onChange={(content) => setLocalDescription(content || '')}
                    />
                </Label>
                <MainButton text={'Сохранить'} onClick={() => {}}/>
            </div>
        </div>
    );
};