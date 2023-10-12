import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { CreateApplicationData, CreateApplicationFormType } from "../../type/createApplication";
import { ApplicationStatus } from "entities/Application";
import { USER_LOCALSTORAGE_DATA, USER_LOCALSTORAGE_TOKENS } from "shared/const/localStorage";
import { createApplicationActions } from "../../slice/createApplicationSlice";
import { refreshToken, userActions } from "entities/User";
import { fetchApplicationsList } from "pages/ApplicationsPage";
import { applicationsPageActions } from "pages/ApplicationsPage";



export const saveApplication = createAsyncThunk<
    CreateApplicationData, 
    CreateApplicationFormType, 
    ThunkConfig<string>
>(
    'login/saveApplication',
    async (formData, { extra, rejectWithValue, dispatch }) => {


        const creatorId = localStorage.getItem(USER_LOCALSTORAGE_DATA)
        

        if(!creatorId){
            throw new Error('Ошибка аунтификации пользователя!')
        }

        const applicationData: CreateApplicationData = {
            title: formData.title ?? '',
            description: formData.description ?? '',
            startWorkDate: formData.startWorkDate ?? '', 
            endWorkDate: formData.endWorkDate ?? '',
            status: ApplicationStatus.NEW,
            creator: JSON.parse(creatorId).employee.id,
            subject: formData.subject ?? ''
        }

        try{
            const response = await extra.api.post<CreateApplicationData>('/api/v1/applications/create/', applicationData)
            if(!response.data){
            
                throw new Error('Ошибка сохранения заявки!')
            }

            dispatch(createApplicationActions.clearForm())
            dispatch(applicationsPageActions.closeModal())
            dispatch(fetchApplicationsList())
            return response.data
        }catch (e: any){
            if(e.response.status === 401){
                dispatch(userActions.logout())
            }
            return rejectWithValue(e.response.message)
        }
    }
)