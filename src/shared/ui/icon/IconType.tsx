import {
    ArrowDownIcon, ArrowRightIcon,
    BoldIcon, DynamicFieldIcon,
    ItalicIcon,
    OrderedListIcon,
    UnderlineIcon,
    UnorderedListIcon
} from "../../assets/icons";

export type IconType =
    | "Arrow-down"
    | "Arrow-right"
    | "DYNAMIC_FIELD"
    | "Bold"
    | "Italic"
    | "Underline"
    | "UL"
    | "OL"
    ;

export enum IconEnum {
    ARROW_DOWN = "Arrow-down",
    ARROW_RIGHT = "Arrow-right",

    BOLD = "Bold",
}


export const iconTypes = new Map([
    ["Arrow-down", <ArrowDownIcon key="arrow-down" width={9.5} height={5.5} />],
    ["Arrow-right", <ArrowRightIcon key="arrow-down" width={5.5} height={9.5} />],
    ["Bold", <BoldIcon key="BoldIcon" width={9} height={12} />],
    ["Italic", <ItalicIcon key="ItalicIcon" width={12} height={12}/>],
    ["Underline", <UnderlineIcon key="UnderlineIcon" width={12} height={15}/>],
    ["UL", <UnorderedListIcon key="UnorderedListIcon" width={20} height={12}/>],
    ["OL", <OrderedListIcon key="OrderedListIcon" width={16} height={14}/>],
    ["DYNAMIC_FIELD", <DynamicFieldIcon key="DynamicFieldIcon" width={15.5} height={19}/>],
]);
