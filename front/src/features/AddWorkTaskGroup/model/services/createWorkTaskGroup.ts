import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { userActions } from "entities/User";
import { addWorkTaskGroupFormData } from "../type/addWorkTaskGroup";
import { WorkTaskGroupItem } from "entities/WorkTaskGroup/model/type/workTaskGroup";



export const createWorkTaskGroup = createAsyncThunk<
    void, 
    addWorkTaskGroupFormData, 
    ThunkConfig<string>
>(
    'addWorkTaskGroup/createWorkTaskGroup',
    async (_, { extra, rejectWithValue, dispatch }) => {

        try{    
            const response = await extra.api.post<WorkTaskGroupItem>('/api/v1/work_task_groups/create/')
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