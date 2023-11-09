import { EntityState } from '@reduxjs/toolkit';
import { WorkObject } from 'entities/WorkObject';

export interface WorkObjectGroup {
    id: number;
    workObjects?: WorkObject[];
    name: string;
    code: string;
}

export interface WorkObjectGroupSchema extends EntityState<WorkObjectGroup> {

    error?: string;
    isLoading?: boolean;
}
