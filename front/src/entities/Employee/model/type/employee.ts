import { EntityState } from '@reduxjs/toolkit';
import { LegalEntity } from 'entities/LegalEntity';
import { User } from 'entities/User';

export interface Employee {
    id: number;
    legalEntity: LegalEntity;
    user: User;
    role: EmployeeRole;
    group: string;
    status: boolean;
}

export interface EmployeeSchema extends EntityState<Employee> {
    isLoading?: boolean;
    error?: string
}

export enum EmployeeRole {
    DISPATCHER = 'dispatcher',
    PERFORMER = 'performer',
    DISPATCHER_PERFORMER = 'dispatcherPerformer',
    INITIATOR = 'initiator',
    ADMIN = 'admin',
}

export const EmployeeRoleValue: Record<EmployeeRole, string> = {
  [EmployeeRole.DISPATCHER]: 'Диспетчер',
  [EmployeeRole.DISPATCHER_PERFORMER]: 'Диспетчер / Исполнитель',
  [EmployeeRole.PERFORMER]: 'Исполнитель',
  [EmployeeRole.INITIATOR]: 'Инициатор',
  [EmployeeRole.ADMIN]: 'Инициатор',
};
