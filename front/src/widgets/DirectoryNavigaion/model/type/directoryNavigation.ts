import { EntityState } from "@reduxjs/toolkit";



export interface DirectoryLinkType {
    path: string;
    title: string;
}


export interface DirectoryNavigaionSchema extends EntityState<DirectoryLinkType> {

    isLoading?: boolean;
    error?: string;
}