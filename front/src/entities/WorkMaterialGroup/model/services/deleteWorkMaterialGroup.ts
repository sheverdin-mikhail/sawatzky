<<<<<<< HEAD
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkMaterialGroupItem } from '../type/workMaterialGroup';
import { fetchWorkMaterialGroupList } from './fetchWorkMaterialGroupList';

export const deleteWorkMaterialGroup = createAsyncThunk<
    void,
    number | string,
=======
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { userActions } from "entities/User";
import { WorkMaterialGroupItem } from "../type/workMaterialGroup";
import { fetchWorkMaterialGroupList } from "./fetchWorkMaterialGroupList";



export const deleteWorkMaterialGroup = createAsyncThunk<
    void, 
    number | string, 
>>>>>>> main
    ThunkConfig<string>
>(
    'workMaterialGroup/deleteWorkMaterialGroup',
    async (groupId, { extra, rejectWithValue, dispatch }) => {
<<<<<<< HEAD
        try {
            const response = await extra.api.delete<WorkMaterialGroupItem>(`/api/v1/work_material_groups/${groupId}`);
            if (response.status !== 204) {
                throw new Error('Ошибка удаления группы услуг');
            }
            dispatch(fetchWorkMaterialGroupList());
        } catch (e: any) {
            if (e.response.status === 401) {
                dispatch(userActions.logout());
            }
            return rejectWithValue(e.response.message);
        }
    },
);
=======

        try{    
            const response = await extra.api.delete<WorkMaterialGroupItem>('/api/v1/work_material_groups/'+groupId)
            if(response.status !== 204){
                throw new Error('Ошибка удаления группы услуг')
            }
            dispatch(fetchWorkMaterialGroupList())
        }catch (e: any){
            if(e.response.status === 401){
                dispatch(userActions.logout())
            }
            return rejectWithValue(e.response.message)
        }
    }
)
>>>>>>> main
