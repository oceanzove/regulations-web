import {
    CompositeDecorator,
    ContentBlock,
    ContentState,
    convertFromRaw,
    Editor,
    EditorState,
    Modifier,
    RichUtils
} from "draft-js";
import {convertFromHTML, convertToHTML} from "draft-convert";
import {type FC, memo, useCallback, useEffect, useRef, useState} from "react";
import "draft-js/dist/Draft.css";

import {BlockStyleControl} from "./block-style-control";
import {dynamicFieldTypes, TEXT_EDITOR_CUSTOM_STYLES, TEXT_EDITOR_STYLE_TO_HTML} from "./configuration.tsx";
import {InlineStyleControl} from "./inline-style-control";
import styles from './text-editor.module.scss';
import {DynamicField} from "./dynamic-field";
import DropdownMenuDynamicField from "./dropdown-menu-dynamic-field.tsx";
import {useOutsideClick} from "../utils";


export type TTextEditorTextStyle =
    | "H1"
    | "H2"
    | "OL"
    | "UL"
    | "BOLD"
    | "ITALIC"
    | "UNDERLINE"
    | "HIGHLIGHT"
    | "DYNAMIC_FIELD";

interface IClasses {
    textEditor?: string;
}

interface ITextEditorProps {
    classes?: IClasses;
    htmlText?: string;
    isInvalid?: boolean;
    onChangeHTMLText?: (value: string) => void;
    placeholder?: string;
    title?: string;
}

const getDecorator = (): CompositeDecorator => {
    const dynamicFieldEntities = (
        contentBlock: ContentBlock,
        callback: (start: number, end: number) => void,
        contentState: ContentState,
    ) => {
        contentBlock.findEntityRanges((character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'DYNAMIC_FIELD'
            );
        }, callback);
    };

    return new CompositeDecorator([
        {
            strategy: dynamicFieldEntities,
            component: DynamicField,
        },
    ]);
};

const TextEditorComponent: FC<ITextEditorProps> = (props: ITextEditorProps) => {
    const {
        classes,
        htmlText,
        isInvalid = false,
        onChangeHTMLText,
        placeholder,
        title,
    } = props;

    const [isFocused, setFocused] = useState(false);


    const decorator = getDecorator();
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty(decorator)
    );

    const contentState = editorState.getCurrentContent();
    const textEditorArea = `
            ${styles.textEditorArea}
            ${!contentState.hasText()
    && contentState.getBlockMap().first().getType() !== "unstyled"
        ? styles.TextEditorWrapperHidePlaceholder : ''
    }`.trim()

    const options = {
        styleToHTML: (style: string) => TEXT_EDITOR_STYLE_TO_HTML(style as TTextEditorTextStyle),
    };

    const convertMessageToHtml = convertToHTML(options);

    const convertHtmlToRaw = (html: string): EditorState => {
        const contentState = convertFromHTML({
            htmlToStyle: (nodeName, node, currentStyle) => {
                if (nodeName === "span" && node.className === "highlight") {
                    return currentStyle.add("HIGHLIGHT");
                } else if (nodeName === "span" && node.className === "DYNAMIC_FIELD") {
                    return currentStyle.add("DYNAMIC_FIELD");
                } else {
                    return currentStyle;
                }
            },
        })(html);


        return EditorState.createWithContent(contentState, decorator);
    };

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        htmlText && setEditorState(convertHtmlToRaw(htmlText));
    }, [htmlText]);

    const handleChangeText = useCallback((value: EditorState) => {
        const currentSelection = value.getSelection();
        onChangeHTMLText?.(convertMessageToHtml(value.getCurrentContent()));
        const stateWithContentAndSelection = EditorState.forceSelection(value, currentSelection);
        setEditorState(stateWithContentAndSelection);
    }, []);

    const getBlockStyle = (block: ContentBlock) => {
        switch (block.getType()) {
            case "blockquote":
                return "RichEditor-blockquote";
            default:
                return '';
        }
    };

    const insertDynamicField = (editorState: EditorState, label: string): EditorState => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'DYNAMIC_FIELD',
            'IMMUTABLE',
            {label}
        );
        console.log('insert');
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

    const replaceDynamicFieldWithList = (
        editorState: EditorState,
        listItems: string[]
    ): EditorState => {
        const contentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        const blockKey = selection.getAnchorKey();
        const block = contentState.getBlockForKey(blockKey);

        let start = -1;
        let end = -1;
        let entityKeyToReplace: string | null = null;

        block.findEntityRanges(
            (char) => {
                const entityKey = char.getEntity();
                if (!entityKey) return false;
                const entity = contentState.getEntity(entityKey);
                return entity.getType() === 'DYNAMIC_FIELD';
            },
            (startOffset, endOffset) => {
                start = startOffset;
                end = endOffset;
                entityKeyToReplace = block.getEntityAt(startOffset);
            }
        );

        if (start === -1 || end === -1 || !entityKeyToReplace) {
            return editorState;
        }

        // Удаляем старое поле
        let newContentState = Modifier.removeRange(
            contentState,
            selection.merge({
                anchorOffset: start,
                focusOffset: end,
            }),
            'backward'
        );

        // Вставляем список (как обычный текст, можно улучшить до block-level)
        const listText = listItems.map((item) => `• ${item}`).join('\n');

        newContentState = Modifier.insertText(
            newContentState,
            newContentState.getSelectionAfter(),
            listText
        );

        const newEditorState = EditorState.push(
            editorState,
            newContentState,
            'insert-characters'
        );

        return EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter());
    };


    /**
     * Работу с динамическими полями - TODO ВЫНЕСТИ В ОТДЕЛЬНУЮ КОМПОНЕНТУ
     */
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        // {
        //     label: 'Руководитель',
        //     value: 'leader',
        // },
        // {
        //     label: 'Подразделение',
        //     value: 'department',
        // },
        {
            label: 'Процесс',
            value: 'process',
            children: [
                {label: 'Руководитель', value: dynamicFieldTypes.PROCESS_DIRECTOR},
                {label: 'Подразделение', value: dynamicFieldTypes.PROCESS_DEPARTMENT},
                {label: 'Процесс', value: dynamicFieldTypes.PROCESS_PROCESS},
                {label: 'Должность', value: dynamicFieldTypes.PROCESS_POSITION},
                {label: 'Сотрудник', value: dynamicFieldTypes.PROCESS_EMPLOYEE},
            ],
        },
        // {
        //     label: 'Должность',
        //     value: 'position',
        // },
        // {
        //     label: 'Сотрудник',
        //     value: 'employee',
        // },
        // {
        //     label: 'Должность (группа)',
        //     value: 'position-group',
        //     children: [
        //         {label: 'Должность А', value: 'position-a'},
        //         {label: 'Должность Б', value: 'position-b'},
        //     ],
        // },
        // {
        //     label: 'Сотрудник (группа)',
        //     value: 'employee-group',
        //     children: [
        //         {label: 'Сотрудник X', value: 'employee-x'},
        //         {label: 'Сотрудник Y', value: 'employee-y'},
        //     ],
        // },
    ];

    const handleDynamicFieldSelect = useCallback((value: string) => {
        console.log('Выбран элемент:', value);
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
                        <div className={styles.dynamicFieldButton}>
                            Ссылка
                        </div>
                        <DropdownMenuDynamicField
                            items={menuItems}
                            label={"Динамические поля"}
                            onSelect={handleDynamicFieldSelect}
                            toggleOpen={toggleMenu}
                            isOpen={isMenuOpen}
                        />
                    </div>
                </div>

                <div className={textEditorArea}>
                    {/*{*/}
                    {/*    htmlText ?*/}
                    {/*        <Editor*/}
                    {/*            blockStyleFn={getBlockStyle}*/}
                    {/*            customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}*/}
                    {/*            editorState={editorState}*/}
                    {/*            onChange={handleChangeText}*/}
                    {/*            placeholder={placeholder}*/}
                    {/*            readOnly={!isFocused}*/}
                    {/*            ref={editorRef}*/}
                    {/*        />*/}
                    {/*        :*/}
                    {/*        <div className={styles.emptyEditor}>*/}
                    {/*            <div className={styles.header}>*/}
                    {/*                Начните работу*/}
                    {/*            </div>*/}
                    {/*            <div className={styles.description}>*/}
                    {/*                Выберите шаблон или составьте свой*/}
                    {/*                из набора разделов и модулей*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*}*/}

                    <Editor
                        blockStyleFn={getBlockStyle}
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
