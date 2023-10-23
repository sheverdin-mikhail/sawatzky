import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { userActions } from "entities/User";
import { AddWorkTaskFormData } from "../type/addWorkTask";
import { WorkTask } from "entities/WorkTask";
import { fetchWorkTaskListByGroupId } from "pages/DirectoryWorkTaskGroupDetailPage";



export const createWorkTask = createAsyncThunk<
    void, 
    AddWorkTaskFormData, 
    ThunkConfig<string>
>(
    'addWorkTask/createWorkTask',
    async (formData, { extra, rejectWithValue, dispatch }) => {

        try{    
            const response = await extra.api.post<WorkTask>('/api/v1/work_tasks/create/', formData)
            if(!response.data){
                throw new Error('Ошибка создания группы услуг')
            }

            dispatch(fetchWorkTaskListByGroupId(`${formData.workTaskGroup}`))
        }catch (e: any){
            if(e.response.status === 401){
                dispatch(userActions.logout())
            }
            return rejectWithValue(e.response.message)
        }
    }
)