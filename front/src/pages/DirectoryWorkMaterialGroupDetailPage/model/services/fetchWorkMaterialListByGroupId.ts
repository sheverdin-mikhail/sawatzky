<<<<<<< HEAD
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { WorkMaterialGroupItem } from 'entities/WorkMaterialGroup';

export const fetchWorkMaterialListByGroupId = createAsyncThunk<
    WorkMaterialGroupItem,
    string,
=======
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { WorkMaterialGroupItem } from "entities/WorkMaterialGroup";



export const fetchWorkMaterialListByGroupId = createAsyncThunk<
    WorkMaterialGroupItem, 
    string, 
>>>>>>> main
    ThunkConfig<string>
>(
    'directoryWorkMaterialGroupDetailPage/fetchWorkMaterialListByGroupId',
    async (groupId, { extra, rejectWithValue, dispatch }) => {
<<<<<<< HEAD
        try {
            const response = await extra.api.get<WorkMaterialGroupItem>(`/api/v1/work_task_groups/${groupId}`);
            if (!response.data) {
                throw new Error('Ошибка сохранения запроса!');
            }
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response.message);
        }
    },
);
=======

        try{    
            const response = await extra.api.get<WorkMaterialGroupItem>('/api/v1/work_task_groups/'+groupId)
            if(!response.data){
            
                throw new Error('Ошибка сохранения запроса!')
            }
            return response.data

        }catch (e: any){
            return rejectWithValue(e.response.message)
        }
    }
)
>>>>>>> main
