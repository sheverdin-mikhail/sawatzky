import { EntityState } from "@reduxjs/toolkit";
import { WorkMaterial } from "entities/WorkMaterial";




export interface DirectoryWorkMaterialGroupDetailSchema extends EntityState<WorkMaterial> {

    groupName?: string;
    groupId?: number;
    isLoading?: boolean;
    error?: string;
}
