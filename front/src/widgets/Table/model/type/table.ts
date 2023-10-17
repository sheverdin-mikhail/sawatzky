

export type TableHeaderType= {
    [key: string]: string;
};

export type TableItemType = Record<keyof TableHeaderType, string | number | boolean>;

export enum TableItemsMod {
    LINK = 'link',
    NORMAL = 'normal'
}

export interface TableType {
    header?: TableHeaderType;
    items?: TableItemType[]
}


export interface TableSchema {

    header?: TableHeaderType;
    items?: TableItemType[];
    selectedItems?: TableItemType[];

    isLoading?: boolean;
    error?: string;
    selectedAll?: boolean;

    _init?: boolean;
} 