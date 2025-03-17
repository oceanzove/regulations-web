import { EditorState, ContentState, RichUtils } from 'draft-js';
import * as React from 'react';
import { BlockType, InlineStyle } from './config.ts';

export type EditorApi = {
    state: EditorState;
    onChange: (state: EditorState) => void;
    currentBlockType: BlockType;
    toggleBlockType: (blockType: BlockType) => void;
    toggleInlineStyle: (inlineStyle: InlineStyle) => void;
    hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
};

export const useEditor = (): EditorApi => {
    const [state, setState] = React.useState(() =>
        EditorState.createWithContent(ContentState.createFromText(''))
    );

    const toggleBlockType = React.useCallback((blockType: BlockType) => {
        setState((currentState) => RichUtils.toggleBlockType(currentState, blockType));
    }, []);

    const currentBlockType = React.useMemo(() => {
        const selection = state.getSelection();
        const content = state.getCurrentContent();
        const block = content.getBlockForKey(selection.getStartKey());

        if (!block) return BlockType.default; // Обработка случая, когда block не найден
        return block.getType() as BlockType;
    }, [state]);

    const toggleInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
        setState((currentState) => RichUtils.toggleInlineStyle(currentState, inlineStyle));
    }, []);

    const hasInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
        const currentStyle = state.getCurrentInlineStyle();
        return currentStyle.has(inlineStyle);
    }, [state]);

    return React.useMemo(() => ({
        state,
        toggleBlockType,
        currentBlockType,
        toggleInlineStyle,
        hasInlineStyle,
        onChange: setState
    }), [currentBlockType, hasInlineStyle, state, toggleBlockType, toggleInlineStyle]);
};
