import clsx from "clsx";
import {ContentBlock, Editor, EditorCommand, EditorState, RichUtils} from "draft-js";
import {convertToHTML, convertFromHTML} from "draft-convert";
import {memo, useCallback, useEffect, useState, type FC} from "react";
import "draft-js/dist/Draft.css";

import {BlockStyleControls} from "./BlockStyleControls";
import {TEXT_EDITOR_CUSTOM_STYLES, TEXT_EDITOR_STYLE_TO_HTML} from "./constants";
import {InlineStyleControls} from "./InlineStyleControls";
import type {TTextEditorProps, TTextEditorTextStyle} from "./types";
import styles from './text-editor.module.scss';

const TextEditorComponent: FC<TTextEditorProps> = ({
                                                       classes,
                                                       htmlText,
                                                       isInvalid = false,
                                                       onChangeHTMLText,
                                                       placeholder,
                                                       title,
                                                   }) => {
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
                } else {
                    return currentStyle;
                }
            },
        })(html);
        return EditorState.createWithContent(contentState);
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
                return null;
        }
    };

    return (
        <div
            className={` 
             ${classes ? classes : ''}
             ${styles.textEditorContainer} 
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
            </div>

            <div className={textEditorArea}>
                <Editor
                    blockRendererFn={getBlockStyle}
                    customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onBlur={handleChangeBlur}
                    onChange={handleChangeText}
                    placeholder={placeholder}
                />
            </div>
            {/*<div className={styles.TextEditorWrapperTitle}>{title}</div>*/}
            {/*<div*/}
            {/*    className={clsx(styles.textEditorArea, {*/}
            {/*        [styles.textEditorAreaIsFocused]: isFocused || contentState.hasText(),*/}
            {/*        [styles.textEditorAreaIsInvalid]: isInvalid,*/}
            {/*    })}*/}
            {/*    onClick={handleChangeFocus}*/}
            {/*>*/}

            {/*</div>*/}
        </div>
        // <div className={clsx("TextEditor", classes?.textEditor)}>
        //   <div className="TextEditor-Title">{title}</div>
        //   <div
        //     className={clsx("TextEditor-Area", {
        //       "TextEditor-Area__isFocused": isFocused || contentState.hasText(),
        //       "TextEditor-Area__isInvalid": isInvalid,
        //     })}
        //     onClick={handleChangeFocus}
        //   >
        //     <div className={wrapperClassName}>
        //       <Editor
        //           blockRendererFn={getBlockStyle}
        //         customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
        //         editorState={editorState}
        //         handleKeyCommand={handleKeyCommand}
        //         onBlur={handleChangeBlur}
        //         onChange={handleChangeText}
        //         placeholder={placeholder}
        //       />
        //     </div>
        //     <div className="TextEditor-Sub">
        //       <BlockStyleControls
        //         editorState={editorState}
        //         onToggle={(blockType) => {
        //           const newState = RichUtils.toggleBlockType(editorState, blockType);
        //           setEditorState(newState);
        //         }}
        //       />
        //       <InlineStyleControls
        //         editorState={editorState}
        //         onToggle={(inlineStyle) => {
        //           const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
        //           setEditorState(newState);
        //         }}
        //       />
        //     </div>
        //   </div>
        // </div>
    );
};

TextEditorComponent.displayName = "TextEditor";

export const TextEditor = memo(TextEditorComponent);
