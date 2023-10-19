import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { userActions } from "entities/User";
import { WorkTaskGroupItem } from "../type/workTaskGroup";
import { fetchWorkTaskGroupList } from "./fetchWorkTaskGroupList";



export const deleteWorkTaskGroup = createAsyncThunk<
    void, 
    number | string, 
    ThunkConfig<string>
>(
    'workTaskGroup/deleteWorkTaskGroup',
    async (groupId, { extra, rejectWithValue, dispatch }) => {

        try{    
            const response = await extra.api.delete<WorkTaskGroupItem>('/api/v1/work_task_groups/'+groupId)
            if(response.status !== 204){
                throw new Error('Ошибка удаления группы услуг')
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