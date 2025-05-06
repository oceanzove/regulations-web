import {
    AtomicBlockUtils,
    CompositeDecorator,
    ContentBlock,
    ContentState,
    Editor,
    EditorCommand,
    EditorState,
    Modifier,
    RichUtils
} from "draft-js";
import {convertToHTML, convertFromHTML} from "draft-convert";
import {memo, useCallback, useEffect, useState, type FC, useRef} from "react";
import "draft-js/dist/Draft.css";

import {BlockStyleControl} from "./block-style-control";
import {TEXT_EDITOR_CUSTOM_STYLES, TEXT_EDITOR_STYLE_TO_HTML} from "./configuration.tsx";
import {InlineStyleControl} from "./inline-style-control";
import styles from './text-editor.module.scss';
import {FormatButton} from "./format-button";
import {MainButton} from "../../shared/ui/main-button/main-button.tsx";
import {Button} from "../../shared/ui/button";
import {DynamicField} from "./dynamic-field";
import DropdownMenu, {MenuItem} from "./dropdown-menu-editor.tsx";
import DROPMENU from "./dropPOOP.tsx";


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

    const handleChangeBlur = () => {
        setFocused((prevState: boolean) => (prevState ? false : prevState));
    };

    const handleChangeFocus = () => {
        setFocused((prevState: boolean) => (prevState ? true : !prevState));
    };

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
            { label }
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


    const buttonRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        {
            label: 'Руководитель',
            value: 'leader',
        },
        {
            label: 'Подразделение',
            value: 'department',
        },
        {
            label: 'Процесс',
            value: 'process',
            children: [
                { label: 'Подпроцесс 1', value: 'sub-process-1' },
                { label: 'Подпроцесс 2', value: 'sub-process-2' },
            ],
        },
        {
            label: 'Должность',
            value: 'position',
        },
        {
            label: 'Сотрудник',
            value: 'employee',
        },
        {
            label: 'Должность (группа)',
            value: 'position-group',
            children: [
                { label: 'Должность А', value: 'position-a' },
                { label: 'Должность Б', value: 'position-b' },
            ],
        },
        {
            label: 'Сотрудник (группа)',
            value: 'employee-group',
            children: [
                { label: 'Сотрудник X', value: 'employee-x' },
                { label: 'Сотрудник Y', value: 'employee-y' },
            ],
        },
    ];

    const handleMenuItemSelect = useCallback((value: string) => {
        console.log('Выбран элемент:', value);
        setIsMenuOpen(false);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    return (
        <div
            className={` 
             ${classes ? classes : ''}
             ${styles.textEditorWrapper} 
             ${isInvalid ? styles.textEditorAreaIsInvalid : ''}
             ${isFocused || contentState.hasText() ? styles.textEditorAreaIsFocused : ''}
             `.trim()}
            onClick={handleChangeFocus}
        >
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
                    <div className={styles.dynamicFieldButton}
                         ref={buttonRef} onClick={toggleMenu}
                    >
                        Динамические поля
                        {isMenuOpen && (
                            <DropdownMenu
                                items={menuItems}
                                onSelect={handleMenuItemSelect}
                                buttonRef={buttonRef}
                                toggleOpen={toggleMenu}
                                isOpen={isMenuOpen}
                            />
                        )}
                        {/*<DROPMENU items={menuItems} onSelect={handleMenuItemSelect} buttonLabel={'OPEN'} />*/}
                    </div>
                </div>
            </div>

            <div className={textEditorArea}>
                {
                    htmlText ?
                        <Editor
                            blockStyleFn={getBlockStyle}
                            customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
                            editorState={editorState}
                            onBlur={handleChangeBlur}
                            onChange={handleChangeText}
                            placeholder={placeholder}
                            // handleBeforeInput={handleBeforeInput} // добавляем обработчик ввода
                        />
                        :
                        <div className={styles.emptyEditor}>
                            <div className={styles.header}>
                                Начните работу
                            </div>
                            <div className={styles.description}>
                                Выберите шаблон или составьте свой
                                из набора разделов и модулей
                            </div>
                        </div>
                }

            </div>
        </div>
    );
};

TextEditorComponent.displayName = "TextEditor";

export const TextEditor = memo(TextEditorComponent);
