import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { CreateApplicationData, CreateApplicationFormType } from "../../type/createApplication";
import { ApplicationStatus } from "entities/Application";
import { USER_LOCALSTORAGE_DATA, USER_LOCALSTORAGE_TOKENS } from "shared/const/localStorage";
import { createApplicationActions } from "../../slice/createApplicationSlice";
import { refreshToken } from "entities/User";
import { fetchApplicationsList } from "pages/ApplicationsPage";



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
            creator: JSON.parse(creatorId).employee.id
        }

        try{
            const response = await extra.api.post<CreateApplicationData>('/api/v1/applications/create/', applicationData)
            if(!response.data){
            
                throw new Error('Ошибка сохранения заявки!')
            }

            dispatch(createApplicationActions.clearForm())
            dispatch(createApplicationActions.closeModal())
            dispatch(fetchApplicationsList())
            return response.data
        }catch (e: any){
            if(e.response.status === 401){
                const refreshJson = localStorage.getItem(USER_LOCALSTORAGE_TOKENS)

                if(refreshJson){
                    dispatch(refreshToken(JSON.parse(refreshJson).refresh)).then(()=>{
                        dispatch(saveApplication(formData))
                    })
                }
                
                
            }else{
                return rejectWithValue('Проверьте корректность введенных данных')
            }
            return rejectWithValue(e.response.message)
        }
    }
)