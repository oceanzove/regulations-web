import {
    ContentBlock,
    ContentState, DefaultDraftBlockRenderMap, Editor,
    EditorState, genKey,
    Modifier,
    RichUtils
} from "draft-js";
import {type FC, memo, useCallback, useEffect, useRef, useState} from "react";
import "draft-js/dist/Draft.css";
import {BlockStyleControl} from "../style-control/block-style-control";
import {
    dynamicFieldTypes,
    TEXT_EDITOR_CUSTOM_STYLES,
} from "../configuration.tsx";
import {InlineStyleControl} from "../style-control/inline-style-control";
import styles from './text-editor.module.scss';
import DropdownMenuDynamicField from "../dropdown-menu-dynamic-field.tsx";
import {useOutsideClick} from "../../utils";
import {SectionBlock} from "../style-control/custom-block/section-block/section-block.tsx";
import {Section} from "../../../pages/regulation/regulation-view/ui/regulation-view-block/section/Sections.tsx";
import {Map} from 'immutable';

import {
    CONVERT_HTML_TO_MESSAGE,
    CONVERT_MESSAGE_TO_HTML,
    GET_DECORATOR,
    NORMALIZE_HTML_TEXT
} from "../editor-utils.ts";

export type TTextEditorTextStyle =
    | "H1"
    | "H2"
    | "OL"
    | "UL"
    | "BOLD"
    | "ITALIC"
    | "UNDERLINE"
    | "HIGHLIGHT"

interface IClasses {
    textEditor?: string;
}

interface ITextEditorProps {
    classes?: IClasses;
    htmlText?: string;
    isInvalid?: boolean;
    onChangeHTMLText?: (value: string) => void;
    placeholder?: string;
    sections?: Section[];
}

const TextEditorComponent: FC<ITextEditorProps> = (props: ITextEditorProps) => {
    const {
        classes,
        htmlText,
        isInvalid = false,
        onChangeHTMLText,
        placeholder,
        sections,
    } = props;

    const [isFocused, setFocused] = useState(false);

    const decorator = GET_DECORATOR();
    const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator));

    const contentState = editorState.getCurrentContent();
    const textEditorArea = `
            ${styles.textEditorArea}
            ${!contentState.hasText()
    && contentState.getBlockMap().first().getType() !== "unstyled"
        ? styles.TextEditorWrapperHidePlaceholder : ''
    }`.trim()



    const handleChangeText = useCallback((value: EditorState) => {
        const currentSelection = value.getSelection();
        onChangeHTMLText?.(NORMALIZE_HTML_TEXT(CONVERT_MESSAGE_TO_HTML(value.getCurrentContent())));
        const stateWithContentAndSelection = EditorState.forceSelection(value, currentSelection);
        setEditorState(stateWithContentAndSelection);
    }, [onChangeHTMLText]);

    const getBlockStyle = (block: ContentBlock) => {
        switch (block.getType()) {
            case "blockquote":
                return "RichEditor-blockquote";
            default:
                return '';
        }
    };

    const prevSectionsRef = useRef<Section[] | undefined>(undefined);


    const insertAllSections = useCallback((sections: Section[]): EditorState => {
        const blocks: ContentBlock[] = [];

        sections.forEach(section => {
            blocks.push(new ContentBlock({
                key: genKey(),
                type: "section",
                data: Map({ sectionId: section.id, title: section.title, content: section.content})
            }));

            // Пустая строка для разделения
            blocks.push(new ContentBlock({
                key: genKey(),
                type: "unstyled",
            }));
        });


        // Создаём ContentState из массива блоков
        const contentState = ContentState.createFromBlockArray(blocks);

        return EditorState.createWithContent(contentState, GET_DECORATOR());
    }, []);

    const [isInitialized, setInitialized] = useState(false);


    useEffect(() => {
        if (!isInitialized) {
            if (htmlText) {
                const contentState = CONVERT_HTML_TO_MESSAGE(htmlText);
                setEditorState(EditorState.createWithContent(contentState, decorator));
                setInitialized(true);
            } else if (props.sections?.length) {
                setEditorState(insertAllSections(props.sections));
                setInitialized(true);
            }
        }
    }, [htmlText, props.sections, insertAllSections, isInitialized, decorator]);

    useEffect(() => {
        const sectionsChanged = JSON.stringify(prevSectionsRef.current) !== JSON.stringify(sections);
        if (sectionsChanged) {
            if (!sections || sections.length === 0) {
                setEditorState(EditorState.createEmpty(decorator));
            } else {
                const newEditorState = insertAllSections(sections);
                setEditorState(newEditorState);
            }
            prevSectionsRef.current = sections;
        }
    }, [decorator, editorState, handleChangeText, htmlText, insertAllSections, sections]);

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
        return null;
    };

    const handleReturn = (editorState: EditorState) => {
        const selection = editorState.getSelection();
        const content = editorState.getCurrentContent();
        const block = content.getBlockForKey(selection.getStartKey());

        if (block.getType() === "section") {
            // Вставить пустой параграф после секции
            const newContent = Modifier.splitBlock(content, selection);
            const newEditorState = EditorState.push(editorState, newContent, 'split-block');
            // Принудительно меняем тип блока на обычный параграф
            const withUnstyled = RichUtils.toggleBlockType(newEditorState, "unstyled");
            setEditorState(withUnstyled);
            return 'handled';
        }

        return 'not-handled';
    };

    const insertDynamicField = (editorState: EditorState, label: string): EditorState => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'DYNAMIC_FIELD',
            'IMMUTABLE',
            {label}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const selection = editorState.getSelection();

        const newContentState = Modifier.replaceText(
            contentStateWithEntity,
            selection,
            label,
            undefined,
            entityKey
        );

        const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
        return EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter());
    };

    // const replaceDynamicFieldWithList = (
    //     editorState: EditorState,
    //     listItems: string[]
    // ): EditorState => {
    //     const contentState = editorState.getCurrentContent();
    //     const selection = editorState.getSelection();
    //     const blockKey = selection.getAnchorKey();
    //     const block = contentState.getBlockForKey(blockKey);
    //
    //     let start = -1;
    //     let end = -1;
    //     let entityKeyToReplace: string | null = null;
    //
    //     block.findEntityRanges(
    //         (char) => {
    //             const entityKey = char.getEntity();
    //             if (!entityKey) return false;
    //             const entity = contentState.getEntity(entityKey);
    //             return entity.getType() === 'DYNAMIC_FIELD';
    //         },
    //         (startOffset, endOffset) => {
    //             start = startOffset;
    //             end = endOffset;
    //             entityKeyToReplace = block.getEntityAt(startOffset);
    //         }
    //     );
    //
    //     if (start === -1 || end === -1 || !entityKeyToReplace) {
    //         return editorState;
    //     }
    //
    //     // Удаляем старое поле
    //     let newContentState = Modifier.removeRange(
    //         contentState,
    //         selection.merge({
    //             anchorOffset: start,
    //             focusOffset: end,
    //         }),
    //         'backward'
    //     );
    //
    //     // Вставляем список (как обычный текст, можно улучшить до block-level)
    //     const listText = listItems.map((item) => `• ${item}`).join('\n');
    //
    //     newContentState = Modifier.insertText(
    //         newContentState,
    //         newContentState.getSelectionAfter(),
    //         listText
    //     );
    //
    //     const newEditorState = EditorState.push(
    //         editorState,
    //         newContentState,
    //         'insert-characters'
    //     );
    //
    //     return EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter());
    // };


    /**
     * Работу с динамическими полями - TODO ВЫНЕСТИ В ОТДЕЛЬНУЮ КОМПОНЕНТУ
     */
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        {
            label: 'Процесс',
            value: 'process',
            children: [
                // {label: 'Руководитель', value: dynamicFieldTypes.PROCESS_DIRECTOR},
                {label: 'Подразделение', value: dynamicFieldTypes.PROCESS_DEPARTMENT},
                {label: 'Процесс', value: dynamicFieldTypes.PROCESS_PROCESS},
                {label: 'Должность', value: dynamicFieldTypes.PROCESS_POSITION},
                // {label: 'Сотрудник', value: dynamicFieldTypes.PROCESS_EMPLOYEE},
            ],
        },
    ];

    // const handleGeneratePDF = () => {
    //     const rawContent = convertToRaw(editorState.getCurrentContent());
    //     const pdfState = new stateToPdfMake(rawContent);
    //
    //     const result = pdfState.generate({ download: true, fileName: 'document.pdf' });
    //     pdfMake.createPdf(result).download('document.pdf');
    // };

    // const handleGenerateDOCX = () => {
    //     const html = CONVERT_MESSAGE_TO_HTML(editorState.getCurrentContent());
    //     await HTMLtoDOCX(html, headerHTMLString, documentOptions, footerHTMLString)
    // };

    const handleDynamicFieldSelect = useCallback((value: string) => {
        insertDynamicField(editorState, value);
        setEditorState(prev => insertDynamicField(prev, value));
    }, [editorState]);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const editorWrapperRef = useOutsideClick(() => {
        setFocused(false);
    });

    const editorRef = useRef<Editor>(null);

    return (
        <div
            className={` 
             ${classes ? classes : ''}
             ${styles.textEditorWrapper} 
             ${isInvalid ? styles.textEditorAreaIsInvalid : ''}
             ${isFocused ? styles.textEditorAreaIsFocused : ''}
             `.trim()}
            onClick={() => setFocused(true)}
        >
            <div ref={editorWrapperRef}>
                <div className={styles.textEditorControl}>
                    <InlineStyleControl
                        editorState={editorState}
                        onToggle={(inlineStyle) => {
                            const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
                            setEditorState(newState);
                        }}
                    />
                    <BlockStyleControl
                        editorState={editorState}
                        onToggle={(blockType) => {
                            const newState = RichUtils.toggleBlockType(editorState, blockType);
                            setEditorState(newState);
                        }}
                    />

                    {/* Вот сюда добавь кнопку */}
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => {*/}
                    {/*        setEditorState(prev => insertDynamicField(prev, 'КИРИЛЛ'));*/}
                    {/*    }}*/}
                    {/*    className={styles.dynamicFieldButton}*/}
                    {/*>*/}
                    {/*    Вставить «КИРИЛЛ»*/}
                    {/*</button>*/}
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => {*/}
                    {/*        setEditorState(prev => replaceDynamicFieldWithList(prev, ['Яблоко', 'Банан', 'Апельсин']));*/}
                    {/*    }}*/}
                    {/*    className={styles.dynamicFieldButton}*/}
                    {/*>*/}
                    {/*    Раскрыть "КИРИЛЛА"*/}
                    {/*</button>*/}
                    <div className={styles.dynamicFieldButtonContainer}>
                        <DropdownMenuDynamicField
                            items={menuItems}
                            label={"Динамические поля"}
                            onSelect={handleDynamicFieldSelect}
                            toggleOpen={toggleMenu}

                            isOpen={isMenuOpen}
                        />
                        {/*<button onClick={() => handleGeneratePDF()}>*/}
                        {/*    Экспорт в PDF*/}
                        {/*</button>*/}
                        {/*<button onClick={() => handleGenerateDOCX()}>*/}
                        {/*    Экспорт в Word*/}
                        {/*</button>*/}
                    </div>
                </div>

                <div className={textEditorArea}>
                    <Editor
                        handleReturn={() => handleReturn(editorState)}
                        blockStyleFn={getBlockStyle}
                        blockRendererFn={blockRendererFn}
                        customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
                        editorState={editorState}
                        onChange={handleChangeText}
                        placeholder={placeholder}
                        readOnly={!isFocused}
                        ref={editorRef}
                    />
                </div>
            </div>
        </div>
    );
};

TextEditorComponent.displayName = "TextEditor";

export const TextEditor = memo(TextEditorComponent);
