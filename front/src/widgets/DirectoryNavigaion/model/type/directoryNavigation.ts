import { EntityState } from '@reduxjs/toolkit';

export interface DirectoryLinkType {
    path: string;
    text: string;
    sawatzkyOnly: boolean;
}

export interface DirectoryNavigaionSchema extends EntityState<DirectoryLinkType> {

    isLoading?: boolean;
    error?: string;
}
