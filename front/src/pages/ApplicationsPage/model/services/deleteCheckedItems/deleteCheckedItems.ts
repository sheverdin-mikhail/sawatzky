import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { fetchApplicationsList } from "../fetchApplicationsList/fetchApplicationsList";



export const deleteCheckedItems = createAsyncThunk<
    void, 
    string[], 
    ThunkConfig<string>
>(
    'applicationsPage/deleteCheckedItems',
    async (listId, { extra, rejectWithValue, dispatch }) => {

        try{ 
            if(listId.length > 0){
                await Promise.all(listId.map(async (id) => {
                    const response = await extra.api.delete(`/api/v1/applications/${id}`);
                    if (response.status !== 204) {
                        throw new Error('Ошибка удаления заявки!');
                    }
                }));
            }
            else{
                throw new Error('Ни одная заявка не выбрана!')
            }
            dispatch(fetchApplicationsList())

        }catch (e: any){
            if(e.response.status === 401){
                return rejectWithValue('Проверьте корректность введенных данных')
 
            }else{
                return rejectWithValue('Проверьте корректность введенных данных')
            }
        }
    }
)