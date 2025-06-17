import {
    AddIcon,
    ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon,
    BoldIcon, CrossIcon, DatePickerIcon, DynamicFieldIcon, ExportPdfIcon, FilterIcon,
    ItalicIcon,
    OrderedListIcon, SearchIcon,
    UnderlineIcon,
    UnorderedListIcon
} from "../../assets/icons";

export type IconType =
    | "Arrow-down"
    | "Arrow-right"
    | "Arrow-left"
    | "DYNAMIC_FIELD"
    | "Export-pdf"
    | "Bold"
    | "Italic"
    | "Underline"
    | "UL"
    | "OL"
    | "ADD"
    | "SEARCH"
    | "FILTER"
    | "CROSS"
    | "DATE_PICKER"
    ;

export enum IconEnum {
    ARROW_DOWN = "Arrow-down",
    ARROW_RIGHT = "Arrow-right",
    ARROW_LEFT = "Arrow-left",
    EXPORT_PDF = "Export-pdf",
    ADD = "ADD",
    SEARCH = "SEARCH",
    FILTER = "FILTER",
    BOLD = "Bold",
    CROSS = "CROSS",
    DATE_PICKER = "DATE_PICKER"
}


export const iconTypes = new Map([
    ['ADD', <AddIcon key="add-icon" width={24} height={24}/>],
    ['SEARCH', <SearchIcon key="add-icon"/>],
    ['DATE_PICKER', <DatePickerIcon key={'date-picker'} width={18} height={17}/> ],
    ['FILTER', <FilterIcon key="filter-icon" width={17.5} height={13.5} color={'#8692A7'}/>],
    ['CROSS', <CrossIcon key="cross-icon"/>],
    ["Export-pdf", <ExportPdfIcon key="export-pdf" width={15.5} height={17.5}/> ],
    ["Arrow-down", <ArrowDownIcon key="arrow-down" width={9.5} height={5.5}/>],
    ["Arrow-left", <ArrowLeftIcon key="arrow-left" width={5.5} height={9.5}/>],
    ["Arrow-right", <ArrowRightIcon key="arrow-down" width={5.5} height={9.5}/>],
    ["Bold", <BoldIcon key="BoldIcon" width={9} height={12}/>],
    ["Italic", <ItalicIcon key="ItalicIcon" width={12} height={12}/>],
    ["Underline", <UnderlineIcon key="UnderlineIcon" width={12} height={15}/>],
    ["UL", <UnorderedListIcon key="UnorderedListIcon" width={20} height={12}/>],
    ["OL", <OrderedListIcon key="OrderedListIcon" width={16} height={14}/>],
    ["DYNAMIC_FIELD", <DynamicFieldIcon key="DynamicFieldIcon" width={15.5} height={19}/>],
]);
