import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { userActions } from "entities/User";
import { WorkMaterialGroupItem } from "../type/workMaterialGroup";



export const fetchWorkMaterialGroupList = createAsyncThunk<
    WorkMaterialGroupItem[],
    void,
    ThunkConfig<string>
>(
    'workMaterialGroup/fetchWorkMaterialGroupList',
    async (_, { extra, rejectWithValue, dispatch }) => {

        try {
            const response = await extra.api.get<WorkMaterialGroupItem[]>('/api/v1/work_material_groups/')
            if (!response.data) {
                throw new Error('Ошибка получения списка групп услуг')
            }

            return response.data

        } catch (e: any) {
            if (e.response.status === 401) {
                dispatch(userActions.logout())
            }
            return rejectWithValue(e.response.message)
        }
    }
)
