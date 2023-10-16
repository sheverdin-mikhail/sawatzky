

export type TableHeaderType= {
    [key: string]: string;
};

export type TableItemType = Record<keyof TableHeaderType, string | number | boolean>;

export enum TableItemsMod {
    LINK = 'link',
    SELECTEBLE = 'selecteble',
    NORMAL = 'normal'
}

export interface TableType {
    header: TableHeaderType;
    items?: TableItemType[]
}


export interface TableSchema {
    table: TableType;
    isLoading: boolean;
    error: string;
} 