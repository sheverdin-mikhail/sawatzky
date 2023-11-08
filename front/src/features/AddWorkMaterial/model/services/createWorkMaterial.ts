import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkMaterial } from 'entities/WorkMaterial';
import { fetchWorkMaterialListByGroupId } from 'pages/DirectoryWorkMaterialGroupDetailPage';
import { AddWorkMaterialFormData } from '../type/addWorkMaterial';

export const createWorkMaterial = createAsyncThunk<
    void,
    AddWorkMaterialFormData,
    ThunkConfig<string>
>(
    'addWorkMaterial/createWorkMaterial',
    async (formData, { extra, rejectWithValue, dispatch }) => {
        try {
            const response = await extra.api.post<WorkMaterial>('/api/v1/work_material/create/', formData);
            if (!response.data) {
                throw new Error('Ошибка создания группы услуг');
            }

            dispatch(fetchWorkMaterialListByGroupId(`${formData.workMaterialGroup}`));
        } catch (e: any) {
            if (e.response.status === 401) {
                dispatch(userActions.logout());
            }
            return rejectWithValue(e.response.message);
        }
    },
);
