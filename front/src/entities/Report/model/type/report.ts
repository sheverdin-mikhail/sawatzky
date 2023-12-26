import { Employee } from 'entities/Employee';
import { LegalEntity } from 'entities/LegalEntity';
import { WorkObject } from 'entities/WorkObject';
import { WorkObjectGroup } from 'entities/WorkObjectGroup';

export interface Report {
  id: number;
  period?: string;
  workObjectsGroup?: WorkObjectGroup;
  workObject?: WorkObject;
  legalEntity?: LegalEntity;
  employee?: Employee;
}
