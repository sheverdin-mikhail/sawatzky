import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkMaterial } from 'entities/WorkMaterial';
import { fetchApplicationDetail } from 'pages/ApplicationDetailPage/model/services/fetchApplicationDetail/fetchApplicationDetail';
import { AddWorkMaterialApplicationFormData } from '../type/addWorkMaterialApplicationForm';
import { addWorkMaterialApplicationFormActions } from '../slice/addWorkMaterialApplicationFormSlice';

export const addWorkMaterialToApplication = createAsyncThunk<
    void,
    AddWorkMaterialApplicationFormData,
    ThunkConfig<string>
>(
  'addWorkMaterialToApplication/addWorkMaterialToApplication',
  async (formData, { extra, rejectWithValue, dispatch }) => {
    try {
      if (!formData.applicationId) {
        throw new Error('Не найдено ID запроса');
      }

      if (formData.workMaterial) {
        const response = await extra.api.patch<WorkMaterial>(`/api/v1/applications/update/${formData.applicationId}/`, {
          workMaterials: [...formData?.prevWorkMaterials ?? [], formData.workMaterial],
        });
        if (!response.data) {
          throw new Error('Ошибка добавления услуги');
        }
      } else {
        const response = await extra.api.patch<WorkMaterial>(`/api/v1/applications/update/${formData.applicationId}/`, {
          workMaterials: [...formData?.prevWorkMaterials ?? []],
        });
        if (!response.data) {
          throw new Error('Ошибка добавления услуги');
        }
      }
      dispatch(addWorkMaterialApplicationFormActions.closeModal());
      dispatch(fetchApplicationDetail(formData.applicationId));
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
