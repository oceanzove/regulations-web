import {IRegulation} from "../../../../../../entities/regulation/api/types.ts";
import {TextEditor} from "../../../../../../widgets/text-editor";
import {Section} from "../section/Sections.tsx";
import React from "react";

interface IRegulationEditorProps {
    regulation: IRegulation,
    selectedSections: Section[]
    // updateTitle: (id: string, title: string) => void,
    // updateContent: (id: string, content: string) => void,
}

export const RegulationEditor: React.FC<IRegulationEditorProps> = (props) => {
    const { regulation, selectedSections } = props
    const handleEditorChange = (value: string) => {
        console.log(value);
        // setEditorState(state);
    };

    console.log(selectedSections)

    // const handleSave = async () => {
    //     try {
    //         const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    //         updateContent(activeRegulation.id, content);
    //         notificationSuccess('Сохранение', 'Регламент успешно сохранен');
    //     } catch {
    //         notificationError('Сохранение', 'Не удалось сохранить регламент');
    //     }
    // };

    // Генерация HTML если regulation.content пуст

    return (
        <TextEditor
            htmlText={regulation.content}
            sections={selectedSections}
            onChangeHTMLText={handleEditorChange}
        />
    );
};
