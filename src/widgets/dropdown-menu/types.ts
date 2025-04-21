export interface IDropdownMenuData {
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