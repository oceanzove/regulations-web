export interface IDropdownMenuBlock {
    title: string;
    sections: IMenuSection[];
}

export interface IMenuItem {
    label: string;
    checked: boolean;
}

export interface IMenuSection {
    title: string;
    items: IMenuItem[];
}

export interface IDropdownMenuProps {
    blocks: IDropdownMenuBlock[];
}