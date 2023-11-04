import { EntityState } from '@reduxjs/toolkit';
<<<<<<< HEAD
import { WorkMaterial } from 'entities/WorkMaterial';
=======
import { WorkMaterial } from "entities/WorkMaterial";

>>>>>>> main

export interface WorkMaterialGroupItem {
    id: number;
    name: string;
    materials?: WorkMaterial[];
}

<<<<<<< HEAD
=======

>>>>>>> main
export interface WorkMaterialGroupSchema extends EntityState<WorkMaterialGroupItem> {

    isLoading?: boolean;
    error?: string;

    workMaterialsGroupList?: WorkMaterialGroupItem[];

<<<<<<< HEAD
}
=======

}
>>>>>>> main
