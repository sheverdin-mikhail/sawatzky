<<<<<<< HEAD
import { EntityState } from '@reduxjs/toolkit';
import { WorkMaterial } from 'entities/WorkMaterial';
=======
import { EntityState } from "@reduxjs/toolkit";
import { WorkMaterial } from "entities/WorkMaterial";



>>>>>>> main

export interface DirectoryWorkMaterialGroupDetailSchema extends EntityState<WorkMaterial> {

    groupName?: string;
    groupId?: number;
    isLoading?: boolean;
    error?: string;
<<<<<<< HEAD
}
=======
}
>>>>>>> main
