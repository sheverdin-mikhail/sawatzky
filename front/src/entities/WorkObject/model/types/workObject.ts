import { EntityState } from '@reduxjs/toolkit';

export interface WorkObject {
    id: number;
    name: string;
    code: string;
    contractNumber: string;
    address: string;
}

export interface WorkObjectSchema extends EntityState<WorkObject> {
    error?: string;
    isLoading?: boolean;
}
