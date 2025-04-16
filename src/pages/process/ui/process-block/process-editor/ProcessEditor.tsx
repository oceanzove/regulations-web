import css from './ProcessEditor.module.scss';
import React, {useEffect, useState} from "react";
import {Label} from "../../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../../shared/ui/input/input.tsx";
import {MainButton} from "../../../../../shared/ui/main-button/main-button.tsx";
import {IProcess, IStep} from "../../../../../entities/process/api/types.ts";
import {processApi} from "../../../../../entities/process/api/api.ts";
import {notificationError, notificationSuccess} from "../../../../../widgets/notifications/callNotification.tsx";
import {StepList} from "./steps-list";

interface IProcessEditorProps {
    activeProcess: IProcess,
    steps: IStep[],
    updateTitle: (id: string, title: string) => void,
    updateDescription: (id: string , description: string) => void,
}

export const ProcessEditor = (props: IProcessEditorProps) => {
    const { activeProcess, steps, updateTitle, updateDescription } = props;

    const [localTitle, setLocalTitle] = useState(activeProcess.title);
    const [localDescription, setLocalDescription] = useState(activeProcess.description);

    const isChanged = localTitle !== activeProcess.title || localDescription !== activeProcess.description;

    useEffect(() => {
        setLocalTitle(activeProcess.title);
        setLocalDescription(activeProcess.description);
    }, [activeProcess]);

    const [update, { isLoading }] = processApi.useUpdateMutation();

    const onSaveClick = () => {
        if (!isChanged) return;

        if (localTitle !== activeProcess.title) {
            updateTitle(activeProcess.id, localTitle);
        }
        if (localDescription !== activeProcess.description) {
            updateDescription(activeProcess.id, localDescription);
        }
        if (localTitle !== activeProcess.title || localDescription !== activeProcess.description) {
            try {
                update({ process: activeProcess.id, title: localTitle, description: localDescription})
                notificationSuccess('Сохранение', 'Процесс успешно сохранен');
            } catch {
                notificationError('Сохранение', 'Не удалось сохранить процесс');
            }
        }
    };

    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <Label label={'Название'}>
                    <Input
                        value={localTitle}
                        onChange={(e) => setLocalTitle(e.target.value || '')}
                    />
                </Label>
                <Label label={'Описание'}>
                    <Input
                        value={localDescription}
                        onChange={(e) => setLocalDescription(e.target.value || '')}
                    />
                </Label>
                <Label label={'Шаги'}>
                   <StepList
                       steps={steps}
                       updateSteps={() => {}}
                   />
                </Label>
                <MainButton
                    text={'Сохранить'}
                    onClick={onSaveClick}
                    disabled={!isChanged || isLoading}
                />
            </div>
        </div>
    );
};
