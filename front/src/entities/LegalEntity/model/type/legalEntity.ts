import { EntityState } from '@reduxjs/toolkit';
import { WorkMaterialGroupItem } from 'entities/WorkMaterialGroup';
import { WorkObject } from 'entities/WorkObject';
import { WorkObjectGroup } from 'entities/WorkObjectGroup';
import { WorkTaskGroupItem } from 'entities/WorkTaskGroup';

export interface LegalEntity {
    id: number;
    name?: string;
    head?: string;
    legalAddress?: string;
    actualAddress?: string;
    phone?: string;
    mail?: string;
    INN?: string;
    settlementAccount?: string;
    correspondentAccount?: string;
    bank?: string;
    bik?: string;
    sawatzki?: boolean;
    prepayment?: boolean;
    status?: boolean;

    workObject?: WorkObject;
    workObjectsGroup?: WorkObjectGroup;
    workTaskGroups?: WorkTaskGroupItem[];
    workMaterialGroups?: WorkMaterialGroupItem[];
}

export interface LegalEntitySchema extends EntityState<LegalEntity> {

    error?: string;
    isLoading?: boolean;
}
