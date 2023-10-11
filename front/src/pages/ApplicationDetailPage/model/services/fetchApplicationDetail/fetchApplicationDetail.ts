import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { Application } from "entities/Application";
import { USER_LOCALSTORAGE_TOKENS } from "shared/const/localStorage";
import { refreshToken } from "entities/User/model/services/refreshToken/refreshToken";



export const fetchApplicationDetail= createAsyncThunk<
    Application, 
    string, 
    ThunkConfig<string>
>(
    'applicationsPage/fetchApplicationsList',
    async (applicationId, { extra, rejectWithValue, dispatch }) => {

        try{    
            const response = await extra.api.get<Application>('/api/v1/applications/'+applicationId)
            if(!response.data){
            
                throw new Error('Ошибка сохранения заявки!')
            }
            return response.data

        }catch (e: any){
            if(e.response.status === 401){
                const refreshJson = localStorage.getItem(USER_LOCALSTORAGE_TOKENS)

                if(refreshJson){
                    dispatch(refreshToken(JSON.parse(refreshJson).refresh)).then(()=>{
                        dispatch(fetchApplicationDetail(applicationId))
                    })
                }
                
                
            }else{
                return rejectWithValue('Проверьте корректность введенных данных')
            }
            return rejectWithValue(e.response.message)
        }
    }
)