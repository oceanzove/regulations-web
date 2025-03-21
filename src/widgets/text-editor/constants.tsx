import {TTextEditorTextStyle} from "./types.ts";

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
        case "UNDERLINE":
            return <u/>;
        case "HIGHLIGHT":
            return <span className="highlight"/>
        default:
            return null;
    }
};

export const TEXT_EDITOR_CUSTOM_STYLES = {
    HIGHLIGHT: {
        backgroundColor: "red",
        color: "blue",
    }
};