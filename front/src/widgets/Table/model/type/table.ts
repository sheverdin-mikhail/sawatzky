<<<<<<< HEAD
import { EntityState } from '@reduxjs/toolkit';

=======
import { EntityState } from "@reduxjs/toolkit";


>>>>>>> main
export type TableHeaderType = {
    [key: string]: string;
};

export type TableItemType = Record<keyof TableHeaderType, string | number | boolean>;

export interface TableType {
    header?: TableHeaderType;
    items?: TableItemType[]
    selectedItems?: TableItemType[];
    selectedAll?: boolean;
}

export enum TableItemsMod {
    LINK = 'link',
    NORMAL = 'normal'
}

<<<<<<< HEAD
=======

>>>>>>> main
export interface TableSchema extends EntityState<TableType> {

    tables?: TableType;

    isLoading?: boolean;
    error?: string;
    _init?: boolean;
<<<<<<< HEAD
}
=======
} 
>>>>>>> main
