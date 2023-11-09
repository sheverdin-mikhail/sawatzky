import { EntityState } from '@reduxjs/toolkit';

export interface LegalEntity {
    id: number;
    head: string;
    legalAddress: string;
    actualAddress: string;
    phone: string;
    mail: string;
    INN: string;
    settlementAccount: string;
    correspondentAccount: string;
    bank: string;
    bik: string;
    swatzki: boolean;
}

export interface LegalEntitySchema extends EntityState<LegalEntity> {

    error?: string;
    isLoading?: boolean;
}
