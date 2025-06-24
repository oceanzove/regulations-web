import React, {FC, memo, useEffect, useState} from "react";
import {
    Section,
    Sections
} from "../../../pages/regulation/regulation-view/ui/regulation-view-block/section/Sections.tsx";
import {ContentBlock, DefaultDraftBlockRenderMap, Editor, EditorState} from "draft-js";
import {CONVERT_HTML_TO_MESSAGE, GET_DECORATOR} from "../editor-utils.ts";
import {SectionBlock} from "../style-control/custom-block/section-block/section-block.tsx";
import {TEXT_EDITOR_CUSTOM_STYLES} from "../configuration.tsx";
import Immutable from 'immutable';
import {Label} from "../../../shared/ui/label/label.tsx";
import {Input} from "../../../shared/ui/input/input.tsx";
import {RegulationEditor} from "../../../pages/regulation/regulation-view/ui/regulation-view-block/editor";
import {IRegulation, ISection} from "../../../entities/regulation/api/types.ts";
import styles from './text-editor.module.scss';
import {regulationApi} from "../../../entities/regulation/api/api.ts";


interface IClasses {
    textEditor?: string;
}

interface ITextViewerProps {
    editMode?: boolean;
    classes?: IClasses;
    regulation: IRegulation;
    isInvalid?: boolean;
    sections: ISection[];

    localTitle: string;
    setLocalTitle: (val: string) => void;
    localHtml: string;
    setLocalHtml: (val: string) => void;
    setSelectedSections: (val: ISection[]) => void;
}


const TextViewerComponent: FC<ITextViewerProps> = (props: ITextViewerProps) => {
    const {classes, regulation, localTitle, setLocalTitle, localHtml, setLocalHtml, setSelectedSections, editMode} = props;

    const [editorState, setEditorState] = useState(EditorState.createEmpty(GET_DECORATOR()));

    useEffect(() => {
        if (localHtml) {
            const contentState = CONVERT_HTML_TO_MESSAGE(localHtml);
            setEditorState(EditorState.createWithContent(contentState, GET_DECORATOR()));
        }
    }, [localHtml]);

    const blockRendererFn = (block: ContentBlock) => {
        if (block.getType() === 'section') {
            const data = block.getData();
            const title = data.get('title')
            const content = data.get('content')

            return {
                component: SectionBlock,
                editable: false,
                props: {
                    title,
                    content,
                },
            };
        }

        if (block.getType() === 'unordered-list-item') {
            // подавить отображение
            return {
                component: () => null,
                editable: false,
            };
        }

        return null;
    };

    const customBlockRenderMap = DefaultDraftBlockRenderMap.merge(
        Immutable.Map({
            'unordered-list-item': {
                element: 'div',
            },
        })
    );

    const [sections, setSections] = useState<Section[]>([]);

    const {data: selectedSectionsData} = regulationApi.useGetSectionsIdByRegulationQuery(regulation.id);

    // 1. Инициализируем sections без checked
    useEffect(() => {
        if (!props.sections.length) return;

        const converted = props.sections.map(section => ({
            ...section,
            checked: false,
        }));

        setSections(converted);
    }, [props.sections]);

    // 2. Когда приходят selectedIds — обновляем checked
    useEffect(() => {
        if (!selectedSectionsData?.sectionsIds?.length) return;

        setSections(prev =>
            prev.map(section => ({
                ...section,
                checked: selectedSectionsData.sectionsIds.includes(section.id),
            }))
        );
    }, [selectedSectionsData?.sectionsIds]);


    const handleSectionToggle = (id: string) => {
        setSections(prev =>
            prev.map(sec => sec.id === id ? {...sec, checked: !sec.checked} : sec)
        );
        const section = sections.map(sec => sec.id === id ? {...sec, checked: !sec.checked} : sec);
        props.setSelectedSections(section.filter(section => section.checked));
    };

    const selectedSections = sections.filter(sec => sec.checked);

    return (
        <div className={`${classes?.textEditor}`}>
            {editMode ?
                (
                    <div>
                        <Label label={'Название регламента'}>
                            <Input
                                value={localTitle}
                                onChange={(e) =>
                                    setLocalTitle(e.target.value)}
                                placeholder={'Например, регламент увольнения'}
                            />
                        </Label>
                        <div className={styles.editor}>
                            <Sections
                                sections={sections}
                                onToggle={(id) => {
                                    handleSectionToggle(id);
                                }}
                            />
                            <RegulationEditor
                                htmlText={localHtml}
                                selectedSections={selectedSections}
                                onEditorChange={(htmlText) =>
                                    setLocalHtml(htmlText)}
                            />
                        </div>
                    </div>
                ) :
                <Editor
                    editorState={editorState}
                    onChange={() => {
                    }}
                    readOnly={true}
                    customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
                    blockRendererFn={blockRendererFn}
                    blockRenderMap={customBlockRenderMap}
                />
            }
        </div>
    )
}

TextViewerComponent.displayName = "TextViewer";

export const TextViewer = memo(TextViewerComponent);
