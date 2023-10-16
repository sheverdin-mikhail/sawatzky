import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { userActions } from "entities/User";
import { WorkTaskGroupItem } from "entities/WorkTaskGroup";
import { fetchWorkTaskGroupList } from "entities/WorkTaskGroup/model/services/fetchWorkTaskGroupList";
import { AddWorkTaskFormData } from "features/AddWorkTask/model/type/addWorkTask";



export const createWorkTaskGroup = createAsyncThunk<
    void, 
    AddWorkTaskFormData, 
    ThunkConfig<string>
>(
    'addWorkTaskGroup/createWorkTaskGroup',
    async (formData, { extra, rejectWithValue, dispatch }) => {

        try{    
            const response = await extra.api.post<WorkTaskGroupItem>('/api/v1/work_task_groups/create/', formData)
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