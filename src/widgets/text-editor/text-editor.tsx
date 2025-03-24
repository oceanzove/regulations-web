import {FC, useCallback, useState} from 'react';
import {ContentBlock, DraftEditorCommand, EditorState, RichUtils} from "draft-js";
import clsx from "clsx";
import {Editor} from "react-draft-wysiwyg";
import {TEXT_EDITOR_CUSTOM_STYLES, TEXT_EDITOR_STYLE_TO_HTML} from "./constants.tsx";
import {TTextEditorTextStyle} from "./types.ts";
import {convertToHTML} from "draft-convert";
import {BlockStyleControls} from "./format-button/block-style-controls/block-style-controls.tsx";
import {InlineStyleControls} from "./format-button/inline-style-controls/inline-style-controls.tsx";

import style from './text-editor.module.scss';

type TClasses = {
  textEditor?: string;
};

interface ITextEditorProps {
    onChangeHTMLText?: (value: string) => void;
    placeholder?: string;
    isInvalid?: boolean;
    classes?: TClasses;
    htmlText?: string;
    title?: string;
};

export const TextEditor: FC<ITextEditorProps> = (props) => {
    const {
        classes,
        title,
        isInvalid = false,
        placeholder,
        onChangeHTMLText,
    } = props;

    const [isFocused, setFocused] = useState(false);
    const [editorState, setEditorState ] = useState<EditorState>(EditorState.createEmpty());

    let wrapperClassName = 'TextEditor-Wrapper';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== "unstyled") {
            wrapperClassName += "TextEditor-Wrapper__hidePlaceHolder";
        }
    }

    const options = {
        styleToHTML: (style: string) => TEXT_EDITOR_STYLE_TO_HTML(style as TTextEditorTextStyle),
    };

    const convertMessageToHTML = convertToHTML(options)

    const handlerChangeBlur = () => {
        setFocused((prevState: boolean) => (prevState ? false : !prevState))
    };

    const handlerChangeFocus = () => {
        setFocused((prevState: boolean) => (prevState ? true : !prevState))
    };

    const handleChangeText = useCallback((value: EditorState) => {
       const currentSelection = value.getSelection();
       onChangeHTMLText?.(convertMessageToHTML(value.getCurrentContent()));
       const stateWithContentAndSelection = EditorState.forceSelection(value, currentSelection);
       setEditorState(stateWithContentAndSelection);
    }, []);

    const handleKeyCommand = useCallback(
        (command: DraftEditorCommand, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    }, [setEditorState]);

    const getBlockStyle = (block: ContentBlock) => {
        switch (block.getType()) {
            case "blockquote":
                return "RichEditor-blockquote"
            default:
                return null;
        }
    }

    return (
        <div className={clsx('TextEditor', style.TextEditor, classes?.textEditor)}>
            <div className="TextEditor-Title">
                {title}
            </div>
            <div className={clsx("TextEditor-Area", style.TextEditorArea, {
                "TextEditor-Area__isFocused" : isFocused ||contentState.hasText(),
                "TextEditor-Area__isInvalid" : isInvalid,
            })}
                 onClick={handlerChangeFocus}
            >
                <div className={wrapperClassName}>
                    <Editor
                        customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
                        onBlur={handlerChangeBlur}
                        placeholder={placeholder}
                        editorState={editorState}
                        handleKeyCommand={handleKeyCommand}
                        onEditorStateChange={handleChangeText}
                        customBlockRenderFunc={getBlockStyle}
                        // onChange={handleChangeText}
                    />
                </div>
                <div className={style.TextEditorSub}>
                    <BlockStyleControls editorState={editorState} onToggle={(blockType) => {
                        const newState = RichUtils.toggleBlockType(editorState, blockType);
                        setEditorState(newState);
                    }}
                    />
                    <InlineStyleControls editorState={editorState} onToggle={(inlineStyle) => {
                        const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
                        setEditorState(newState);
                    }}
                    />
                </div>
            </div>
        </div>
    )
}

// type TTextEditorProps = {
//     isInvalid?: boolean;
// }
//
// export const TextEditor: FC<TTextEditorProps> = (props) => {
//
// }