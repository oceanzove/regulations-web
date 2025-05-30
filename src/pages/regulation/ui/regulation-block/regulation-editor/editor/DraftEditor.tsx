import styles from './DraftEditor.module.scss';
import {IRegulation} from "../../../../../../entities/regulation/api/types.ts";
import {useEffect, useState} from "react";
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import {notificationError, notificationSuccess} from "../../../../../../widgets/notifications/callNotification.tsx";
import {TextEditor} from "../../../../../../widgets/text-editor";

interface IRegulationEditorProps {
    activeRegulation: IRegulation,
    // updateTitle: (id: string, title: string) => void,
    // updateContent: (id: string, content: string) => void,
}

export const DraftEditor: React.FC<IRegulationEditorProps> = ({ activeRegulation, updateTitle, updateContent }) => {
    const handleEditorChange = (value: string) => {
        console.log(value);
        // setEditorState(state);
    };

    // const handleSave = async () => {
    //     try {
    //         const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    //         updateContent(activeRegulation.id, content);
    //         notificationSuccess('Сохранение', 'Регламент успешно сохранен');
    //     } catch {
    //         notificationError('Сохранение', 'Не удалось сохранить регламент');
    //     }
    // };

    return (
        <TextEditor
            htmlText={activeRegulation.content}
            onChangeHTMLText={handleEditorChange}
        />
    );
};
