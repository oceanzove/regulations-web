import {CompositeDecorator, ContentBlock, ContentState, convertToRaw, RawDraftEntity} from "draft-js";
import {DynamicField} from "./style-control/custom-entity/dynamic-field";
import {convertFromHTML, convertToHTML, IConvertFromHTMLConfig, IConvertToHTMLConfig} from "draft-convert";
import {TTextEditorTextStyle} from "./implements/text-editor.tsx";
import {TEXT_EDITOR_STYLE_TO_HTML} from "./configuration.tsx";
import html2pdf from 'html2pdf.js';

export const GET_DECORATOR = (): CompositeDecorator => {
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

export const NORMALIZE_HTML_TEXT = (html: string) => {
    let htmlToNormalize = html

    // Убираем все стили
    htmlToNormalize = htmlToNormalize.replace(/ style="[^"]*"/g, '');
    // Склеиваем все <p> в одну строку, разделяя пробелами
    htmlToNormalize = htmlToNormalize.replace(/<\/p>\s*<p>/g, ' ');
    // Удаляем начальные/конечные <p>
    htmlToNormalize = htmlToNormalize.replace(/^<p>/, '').replace(/<\/p>$/, '');
    // (Опционально) Убираем лишние <br>
    htmlToNormalize = htmlToNormalize.replace(/<br\s*\/?>/g, ' ');
    // Чистим двойные пробелы
    htmlToNormalize = htmlToNormalize.replace(/\s+/g, ' ').trim();

    return htmlToNormalize;
}

const fromHTMLOptions: IConvertFromHTMLConfig = {
    htmlToStyle: (nodeName, node, currentStyle) => {
        if (nodeName === "span" && node.className === "highlight") {
            return currentStyle.add("HIGHLIGHT");
        }
        return currentStyle;
    },
    htmlToBlock: (nodeName, node) => {
        if (
            nodeName === "div" &&
            node.classList?.contains("section-block")
        ) {
            const titleNode = node.querySelector(".section-title");
            const title = titleNode ? titleNode.innerHTML : "";

            const contentNode = node.querySelector(".section-content");
            const content = contentNode ? contentNode.innerHTML : "";

            return {
                type: "section",
                data: {sectionId: node.getAttribute("data-section-id") || "", title, content}
            };
        }
        return undefined;
    },
    htmlToEntity: (nodeName, node, createEntity) => {
        if (
            nodeName === "span" &&
            node.classList?.contains("dynamic-field")
        ) {
            const label = node.getAttribute("data-field-label") || '';
            return createEntity(
                'DYNAMIC_FIELD',
                'IMMUTABLE',
                {label}
            );
        }
        return undefined;
    },
}
export const CONVERT_HTML_TO_MESSAGE = convertFromHTML(fromHTMLOptions);

const toHTMLOptions: IConvertToHTMLConfig = {
    styleToHTML: (style: string) => TEXT_EDITOR_STYLE_TO_HTML(style as TTextEditorTextStyle),
    blockToHTML: (block) => {
        if (block.type === "section") {
            const title = block.data?.title || block.text;
            const content = block.data?.content || '';
            const sectionId = block.data?.sectionId || '';
            return {
                start: `<div class="section-block" data-section-id="${sectionId}"><div class="section-title">${title}</div><div class="section-content">${content}</div>`,
                end: `</div>`,
            };
        }
    },
    entityToHTML: (entity: RawDraftEntity, originalText: string) => {
        if (entity.type === 'DYNAMIC_FIELD') {
            const label = entity.data?.label ?? '';
            return `<span class="dynamic-field" data-field-label="${label}">${originalText}</span>`;
        }
        return originalText;
    }
};
export const CONVERT_MESSAGE_TO_HTML = convertToHTML(toHTMLOptions);

// export const EXPORT_TO_WORD = (htmlText) => {
//     const converted = htmlDocx.asBlob(htmlText);
//
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(converted);
//     link.download = 'document.docx';
//     link.click();
//     URL.revokeObjectURL(link.href);
// }