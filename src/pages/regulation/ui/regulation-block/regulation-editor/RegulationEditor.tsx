import styles from './RegulationEditor.module.scss';
import MDEditor from "@uiw/react-md-editor";
import React, {useEffect, useState} from "react";
import {Label} from "../../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../../shared/ui/input/input.tsx";
import {MainButton} from "../../../../../shared/ui/button/button.tsx";
import {regulationApi} from "../../../../../entities/regulation/api/api.ts";
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";
import {notificationError, notificationSuccess} from "../../../../../widgets/notifications/callNotification.tsx";
import RegulationIcon from "../../../../../shared/assets/images/regulation_icon.svg";
import {TextEditorProvider} from "../../../../../widgets/text-editor/context.tsx";
import ToolPanel from "../../../../../widgets/tool-panel";
import TextEditor from "../../../../../widgets/text-editor";

interface IRegulationEditorProps {
    activeRegulation: IRegulation,
    updateTitle: (id: string, title: string) => void,
    updateContent: (id: string ,content: string) => void,
}
export const RegulationEditor = (props: IRegulationEditorProps) => {
    // const { activeRegulation, updateContent, updateTitle } = props;

    // const [localTitle, setLocalTitle] = useState(activeRegulation.title);
    // const [localContent, setLocalContent] = useState(activeRegulation.content);

    // const isChanged = localTitle !== activeRegulation.title || localContent !== activeRegulation.content;

    // useEffect(() => {
    //     setLocalTitle(activeRegulation.title);
    //     setLocalContent(activeRegulation.content);
    // }, [activeRegulation]);

    // const [update, { isLoading }] = regulationApi.useUpdateMutation();

    // const onSaveClick = () => {
    //     if (!isChanged) return;
    //
    //     if (localTitle !== activeRegulation.title) {
    //         updateTitle(activeRegulation.id, localTitle);
    //     }
    //     if (localContent !== activeRegulation.content) {
    //         updateContent(activeRegulation.id, localContent);
    //     }
    //     if (localTitle !== activeRegulation.title || localContent !== activeRegulation.content) {
    //         try {
    //             update({ regulation: activeRegulation.id, title: localTitle, content: localContent});
    //             notificationSuccess('Сохранение', 'Регламент успешно сохранен');
    //         } catch {
    //             notificationError('Сохранение', 'Не удалось сохранить регламент');
    //         }
    //     }
    // };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <img src={RegulationIcon} alt="Regulation icon"/>
                {/*<div>{localTitle}</div>*/}
            </div>
            <div className={styles.container}>
                <TextEditorProvider >
                    <ToolPanel />
                    <TextEditor className={'w-md-editor'} />
                </TextEditorProvider>
            </div>
        </div>
    );
};
