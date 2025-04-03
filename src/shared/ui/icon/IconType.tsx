import {BoldIcon, ItalicIcon, UnderlineIcon} from "../../assets/icons";

export type IconType =
  | "Bold"
  | "Italic"
  | "Underline"
 ;

export const iconTypes = new Map([
  ["Bold", <BoldIcon key="BoldIcon" width={16} height={16} />],
  ["Italic", <ItalicIcon key="ItalicIcon" width={16} height={16} />],
  ["Underline", <UnderlineIcon key="UnderlineIcon" width={16} height={16} />],
]);
