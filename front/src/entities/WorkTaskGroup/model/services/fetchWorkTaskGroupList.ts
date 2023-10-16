import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { userActions } from "entities/User";
import { WorkTaskGroupItem } from "../type/workTaskGroup";



export const fetchWorkTaskGroupList = createAsyncThunk<
    WorkTaskGroupItem[], 
    void, 
    ThunkConfig<string>
>(
    'workTaskGroup/fetchWorkTaskGroupList',
    async (_, { extra, rejectWithValue, dispatch }) => {

        try{    
            const response = await extra.api.get<WorkTaskGroupItem[]>('/api/v1/work_task_groups/')
            if(!response.data){
                throw new Error('Ошибка получения списка групп услуг')
            }

            return response.data

        }catch (e: any){
            if(e.response.status === 401){
                dispatch(userActions.logout())
            }
            return rejectWithValue(e.response.message)
        }
    }
)