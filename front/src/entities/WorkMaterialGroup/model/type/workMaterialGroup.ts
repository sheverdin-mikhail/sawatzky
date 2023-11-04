import { EntityState } from '@reduxjs/toolkit';
import { WorkMaterial } from "entities/WorkMaterial";


export interface WorkMaterialGroupItem {
    id: number;
    name: string;
    materials?: WorkMaterial[];
}

export interface WorkMaterialGroupSchema extends EntityState<WorkMaterialGroupItem> {

    isLoading?: boolean;
    error?: string;

    workMaterialsGroupList?: WorkMaterialGroupItem[];


}
