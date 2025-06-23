import {FC, memo, useEffect, useState} from "react";
import {Section} from "../../../pages/regulation/regulation-view/ui/regulation-view-block/section/Sections.tsx";
import {ContentBlock, DefaultDraftBlockRenderMap, Editor, EditorState} from "draft-js";
import {CONVERT_HTML_TO_MESSAGE, GET_DECORATOR} from "../editor-utils.ts";
import {SectionBlock} from "../style-control/custom-block/section-block/section-block.tsx";
import {TEXT_EDITOR_CUSTOM_STYLES} from "../configuration.tsx";
import Immutable from 'immutable';


interface IClasses {
    textEditor?: string;
}

interface ITextViewerProps {
    classes?: IClasses;
    htmlText?: string;
    isInvalid?: boolean;
    onChangeHTMLText?: (value: string) => void;
    placeholder?: string;
    sections?: Section[];
}


const TextViewerComponent: FC<ITextViewerProps> = (props: ITextViewerProps) => {
    const { classes, htmlText } = props;

    const [editorState, setEditorState] = useState(EditorState.createEmpty(GET_DECORATOR()));

    useEffect(() => {
        if (htmlText) {
            const contentState = CONVERT_HTML_TO_MESSAGE(htmlText);
            setEditorState(EditorState.createWithContent(contentState, GET_DECORATOR()));
        }
    }, [htmlText]);

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
    return (
        <div className={`${classes?.textEditor}`}>
            <Editor
                editorState={editorState}
                onChange={() => {}}
                readOnly={true}
                customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
                blockRendererFn={blockRendererFn}
                blockRenderMap={customBlockRenderMap}
            />
        </div>
    )
}

TextViewerComponent.displayName = "TextViewer";

export const TextViewer = memo(TextViewerComponent);
