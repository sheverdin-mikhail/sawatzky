import { EntityState } from '@reduxjs/toolkit';
import { Employee } from 'entities/Employee';
import { WorkObject } from 'entities/WorkObject';
import { WorkObjectGroup } from 'entities/WorkObjectGroup';

export interface SawatzkyEmployee extends Employee {
    id: number;
    workObjectGroup: WorkObjectGroup;
    workObject: WorkObject;
    workingObjects: number[];
    position: string;
}

export interface SawatzkyEmployeeSchema extends EntityState<SawatzkyEmployee> {
    isLoading?: boolean;
    error?: string
}
