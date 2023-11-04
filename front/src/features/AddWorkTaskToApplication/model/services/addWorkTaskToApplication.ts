<<<<<<< HEAD
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkTask } from 'entities/WorkTask';
import { fetchApplicationDetail } from 'pages/ApplicationDetailPage/model/services/fetchApplicationDetail/fetchApplicationDetail';
import { AddWorkTaskApplicationFormData } from '../type/addWorkTaskApplicationForm';
import { addWorkTaskApplicationFormActions } from '../slice/addWorkTaskApplicationFormSlice';

export const addWorkTaskToApplication = createAsyncThunk<
    void,
    AddWorkTaskApplicationFormData,
=======
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { userActions } from "entities/User";
import { WorkTask } from "entities/WorkTask";
import { AddWorkTaskApplicationFormData } from "../type/addWorkTaskApplicationForm";
import { fetchApplicationDetail } from "pages/ApplicationDetailPage/model/services/fetchApplicationDetail/fetchApplicationDetail";
import { addWorkTaskApplicationFormActions } from "../slice/addWorkTaskApplicationFormSlice";



export const addWorkTaskToApplication = createAsyncThunk<
    void, 
    AddWorkTaskApplicationFormData, 
>>>>>>> main
    ThunkConfig<string>
>(
    'addWorkTaskToApplication/addWorkTaskToApplication',
    async (formData, { extra, rejectWithValue, dispatch }) => {
<<<<<<< HEAD
        try {
            if (!formData.applicationId) {
                throw new Error('Не найдено ID запроса');
            }
            const response = await extra.api.patch<WorkTask>(`/api/v1/applications/update/${formData.applicationId}/`, {
                workTasks: [...formData?.prevWorkTasks ?? [], formData.workTask],
            });
            if (!response.data) {
                throw new Error('Ошибка добавления услуги');
            }
            dispatch(addWorkTaskApplicationFormActions.closeModal());
            dispatch(fetchApplicationDetail(formData.applicationId));
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
            if(!formData.applicationId){
                throw new Error('Не найдено ID запроса')
            }
            const response = await extra.api.patch<WorkTask>(`/api/v1/applications/update/${formData.applicationId}/`, {
                workTasks: [...formData?.prevWorkTasks ?? [], formData.workTask]
            })
            if(!response.data){
                throw new Error('Ошибка добавления услуги')
            }
            dispatch(addWorkTaskApplicationFormActions.closeModal())
            dispatch(fetchApplicationDetail(formData.applicationId))
        }catch (e: any){
            if(e.response.status === 401){
                dispatch(userActions.logout())
            }
            return rejectWithValue(e.response.message)
        }
    }
)
>>>>>>> main
