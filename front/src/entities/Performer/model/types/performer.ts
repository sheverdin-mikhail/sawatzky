import { EntityState } from '@reduxjs/toolkit';
import { SawatzkyEmployee } from 'entities/SawatzkyEmployee';

export interface Performer extends SawatzkyEmployee {
}

export interface ApplicationPerformer {
    performer: SawatzkyEmployee;
    status: PerformerStatus;
    priority: PerformerPriority;
    dateSent: string;
    dateAccepted: string;
    dateDeclined: string;
}

export interface PerformerSchema extends EntityState<Performer>{

    isLoading?: boolean;
    error?: string;
}

export const enum PerformerPriority {
    URGENT = 'urgent',
    NOT_URGEN = 'notUrgent'
}

export const enum PerformerStatus {
    ACCEPTED = 'accepted',
    NOT_ACCEPTED = 'notAccepted',
    DECLINED = 'declined',
    COMPLETED = 'completed',
}
