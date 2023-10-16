import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { userActions } from "entities/User";
import { AddWorkTaskFormData } from "../type/addWorkTask";
import { fetchWorkTaskGroupList } from "entities/WorkTaskGroup/model/services/fetchWorkTaskGroupList";
import { WorkTask } from "entities/WorkTask";



export const createWorkTask = createAsyncThunk<
    void, 
    AddWorkTaskFormData, 
    ThunkConfig<string>
>(
    'addWorkTaskGroup/createWorkTaskGroup',
    async (formData, { extra, rejectWithValue, dispatch }) => {

        try{    
            const response = await extra.api.post<WorkTask>('/api/v1/work_task_groups/create/', formData)
            if(!response.data){
                throw new Error('Ошибка создания группы услуг')
            }

            dispatch(fetchWorkTaskGroupList())
        }catch (e: any){
            if(e.response.status === 401){
                dispatch(userActions.logout())
            }
            return rejectWithValue(e.response.message)
        }
    }
)