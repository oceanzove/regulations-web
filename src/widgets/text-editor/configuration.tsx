import {TTextEditorTextStyle} from "./text-editor.tsx";

export const TEXT_EDITOR_STYLE_TO_HTML = (style: TTextEditorTextStyle) => {
    switch (style) {
        case "H1":
            return <h1/>;
        case "H2":
            return <h2/>;
        case "OL":
            return <ol/>;
        case "UL":
            return <ul/>;
        case "BOLD":
            return <strong/>;
        case "ITALIC":
            return <i/>;
        case "UNDERLINE":
            return <u/>;
        case "HIGHLIGHT":
            return <span className="highlight"/>;
            case "DYNAMIC_FIELD":
                return <span className="DYNAMIC_FIELD"/>;
        default:
            return null;
    }
};

export const TEXT_EDITOR_CUSTOM_STYLES = {
    HIGHLIGHT: {
        backgroundColor: "#8fcbe5",
        color: "#fff",
    },
    DYNAMIC_FIELD: {
        color: "#F91F71",
        fontWeight: 400,
        fontSize: "15px",
        lineHeight: "24px",
        letterSpacing: "0%",
    }
};

export const TEXT_EDITOR_BLOCK_TYPES = [
    // { label: "H2", style: "header-two", icon: "H2", size: "extra-small" },
    {label: "UL", style: "unordered-list-item", icon: "UL", size: "medium"},
    {label: "OL", style: "ordered-list-item", icon: "OL", size: "medium"},
];

export const TEXT_EDITOR_INLINE_STYLES = [
    {label: "Bold", style: "BOLD", icon: "Bold", size: "extra-small"},
    {label: "Italic", style: "ITALIC", icon: "Italic", size: "extra-small"},
    {label: "Underline", style: "UNDERLINE", icon: "Underline", size: "extra-small"},
    // { label: "Highlight", style: "HIGHLIGHT", icon: "Highlight", size: "small" },
    // {label: "DynamicField", style: "DYNAMIC_FIELD", icon: "DYNAMIC_FIELD", size: "medium"},
];
