import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkTask } from 'entities/WorkTask';
import { fetchApplicationDetail } from 'pages/ApplicationDetailPage';
import { AddDocumentToApplicationData } from '../type/addDocument';
import { addDocumentFormActions } from '../slice/addDocumentFormSlice';

export const addDocumentToApplication = createAsyncThunk<
    void,
    AddDocumentToApplicationData,
    ThunkConfig<string>
>(
  'addDocumentForm/addDocumentToApplication',
  async (data, { extra, rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append('file', data.formData.file!!);
      formData.append('docType', data.formData.docType!!);
      formData.append('name', data.formData.name!!);

      const response = await extra.api.post<WorkTask>(`/api/v1/applications/${data.applicationId}/documents/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!response.data) {
        throw new Error('Ошибка создания группы услуг');
      }
      dispatch(addDocumentFormActions.closeModal());
      dispatch(fetchApplicationDetail(data.applicationId));
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
