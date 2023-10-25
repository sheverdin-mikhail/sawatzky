import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { userActions } from "entities/User";
import { WorkTask } from "entities/WorkTask";
import { AddWorkTaskApplicationFormData } from "../type/addWorkTaskApplicationForm";



export const createWorkTask = createAsyncThunk<
    void, 
    AddWorkTaskApplicationFormData, 
    ThunkConfig<string>
>(
    'addWorkTask/createWorkTask',
    async (formData, { extra, rejectWithValue, dispatch }) => {

        try{    
            const response = await extra.api.post<WorkTask>('/api/v1/work_tasks/create/', formData)
            if(!response.data){
                throw new Error('Ошибка создания группы услуг')
            }

        }catch (e: any){
            if(e.response.status === 401){
                dispatch(userActions.logout())
            }
            return rejectWithValue(e.response.message)
        }
    }
)