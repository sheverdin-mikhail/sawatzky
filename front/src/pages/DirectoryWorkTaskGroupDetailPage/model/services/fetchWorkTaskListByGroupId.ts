import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { WorkTaskGroupItem } from "entities/WorkTaskGroup";



export const fetchWorkTaskListByGroupId = createAsyncThunk<
    WorkTaskGroupItem, 
    string, 
    ThunkConfig<string>
>(
    'directoryWorkTaskGroupDetailPage/fetchWorkTaskListByGroupId',
    async (groupId, { extra, rejectWithValue, dispatch }) => {

        try{    
            const response = await extra.api.get<WorkTaskGroupItem>('/api/v1/work_task_groups/'+groupId)
            if(!response.data){
            
                throw new Error('Ошибка сохранения заявки!')
            }
            return response.data

        }catch (e: any){
            return rejectWithValue(e.response.message)
        }
    }
)