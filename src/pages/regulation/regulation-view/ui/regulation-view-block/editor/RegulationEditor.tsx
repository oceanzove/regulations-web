import {IRegulation} from "../../../../../../entities/regulation/api/types.ts";
import {TextEditor} from "../../../../../../widgets/text-editor";
import {Section} from "../section/Sections.tsx";
import React from "react";

interface IRegulationEditorProps {
    htmlText: string,
    selectedSections: Section[],
    onEditorChange: (htmlText: string) => void;
    // updateTitle: (id: string, title: string) => void,
    // updateContent: (id: string, content: string) => void,
}

export const RegulationEditor: React.FC<IRegulationEditorProps> = (props) => {
    const { htmlText, selectedSections, onEditorChange } = props

    const handleEditorChange = (value: string) => {
        onEditorChange(value);
        console.log(value);
    };

    return (
        <TextEditor
            htmlText={htmlText}
            sections={selectedSections}
            onChangeHTMLText={handleEditorChange}
        />
    );
};
