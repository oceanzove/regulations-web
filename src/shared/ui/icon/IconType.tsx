import {BoldIcon, ItalicIcon, OrderedListIcon, UnderlineIcon, UnorderedListIcon} from "../../assets/icons";

export type IconType =
    | "Bold"
    | "Italic"
    | "Underline"
    | "UL"
    | "OL"
    ;

export const iconTypes = new Map([
    ["Bold", <BoldIcon key="BoldIcon" width={9} height={12} />],
    ["Italic", <ItalicIcon key="ItalicIcon" width={12} height={12}/>],
    ["Underline", <UnderlineIcon key="UnderlineIcon" width={12} height={15}/>],
    ["UL", <UnorderedListIcon key="UnorderedListIcon" width={20} height={12}/>],
    ["OL", <OrderedListIcon key="OrderedListIcon" width={16} height={14}/>],
]);
