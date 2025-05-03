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
import {memo, useCallback, useEffect, useState, type FC} from "react";
import "draft-js/dist/Draft.css";

import {BlockStyleControls} from "./block-style-controls";
import {TEXT_EDITOR_CUSTOM_STYLES, TEXT_EDITOR_STYLE_TO_HTML} from "./configuration.tsx";
import {InlineStyleControls} from "./inline-style-controls";
import styles from './text-editor.module.scss';
import {FormatButton} from "./format-button";
import {MainButton} from "../../shared/ui/main-button/main-button.tsx";
import {Button} from "../../shared/ui/button";


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

const DynamicFieldBlock = (props: any) => {
    const { data } = props.blockProps;

    return (
        <div className={styles.dynamicFieldWrapper}>
            <span className={styles.dynamicField}>{data.label}</span>
        </div>
    );
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

    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

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
        return EditorState.createWithContent(contentState);

        // return EditorState.createWithContent(contentState);
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

    const handleKeyCommand = useCallback(
        (command: EditorCommand, editorState: EditorState) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                setEditorState(newState);
                return "handled";
            }
            return "not-handled";
        },
        [editorState, setEditorState],
    );

    const getBlockStyle = (block: ContentBlock) => {
        switch (block.getType()) {
            case "blockquote":
                return "RichEditor-blockquote";
            default:
                return '';
        }
    };

    const insertDynamicField = (editorState: EditorState, fieldLabel: string): EditorState => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'DYNAMIC_FIELD',
            'IMMUTABLE',
            { label: fieldLabel }
        );

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity,
        });

        return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    };

    const blockRendererFn = (block: ContentBlock) => {
        if (block.getType() === 'atomic') {
            const contentState = editorState.getCurrentContent();
            const entity = contentState.getEntity(block.getEntityAt(0));

            if (entity.getType() === 'DYNAMIC_FIELD') {
                return {
                    component: DynamicFieldBlock,
                    editable: false,
                    props: {
                        data: entity.getData(),
                    },
                };
            }
        }

        return null; // остальные блоки рендерятся как обычно
    };

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
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={(inlineStyle) => {
                        const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
                        setEditorState(newState);
                    }}
                />
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={(blockType) => {
                        const newState = RichUtils.toggleBlockType(editorState, blockType);
                        setEditorState(newState);
                    }}
                />

                {/* Вот сюда добавь кнопку */}
                <button
                    type="button"
                    onClick={() => {
                        const newState = insertDynamicField(editorState, 'КИРИЛЛ');
                        setEditorState(newState);
                    }}
                    className={styles.dynamicFieldButton}
                >
                    Вставить «КИРИЛЛ»
                </button>
            </div>

            <div className={textEditorArea}>
                {
                    htmlText ?
                        <Editor
                            blockRendererFn={blockRendererFn}
                            blockStyleFn={getBlockStyle}
                            customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
                            editorState={editorState}
                            handleKeyCommand={handleKeyCommand}
                            onBlur={handleChangeBlur}
                            onChange={handleChangeText}
                            placeholder={placeholder}
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
