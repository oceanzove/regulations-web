import {BoldIcon, ItalicIcon, OrderedListIcon, UnderlineIcon, UnorderedListIcon} from "../../assets/icons";

export type IconType =
    | "Bold"
    | "Italic"
    | "Underline"
    | "UL"
    | "OL"
    ;

export const iconTypes = new Map([
    ["Bold", <BoldIcon key="BoldIcon" width={16} height={16}/>],
    ["Italic", <ItalicIcon key="ItalicIcon" width={16} height={16}/>],
    ["Underline", <UnderlineIcon key="UnderlineIcon" width={16} height={16}/>],
    ["UL", <UnorderedListIcon key="UnorderedListIcon" width={16} height={16}/>],
    ["OL", <OrderedListIcon key="OrderedListIcon" width={16} height={16}/>],
]);
