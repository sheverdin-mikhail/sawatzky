import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { Application, ApplicationSchema } from '../types/application';

export const applicationAdapter = createEntityAdapter<Application>({
    selectId: (application) => application.id,
});

export const getApplication = applicationAdapter.getSelectors<StateSchema>(
    (state) => state.application || applicationAdapter.getInitialState(),
);

export const applicationSlice = createSlice({
    name: 'application',
    initialState: applicationAdapter.getInitialState<ApplicationSchema>({
        ids: [],
        entities: {},
        isLoading: false,
    }),
    reducers: {

    },

});

export const { actions: applicationActions } = applicationSlice;
export const { reducer: applicationReducer } = applicationSlice;
