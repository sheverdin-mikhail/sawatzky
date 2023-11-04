<<<<<<< HEAD
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { Application, ApplicationSchema } from '../types/application';

export const applicationAdapter = createEntityAdapter<Application>({
    selectId: (application) => application.id,
});

export const getApplication = applicationAdapter.getSelectors<StateSchema>(
    (state) => state.application || applicationAdapter.getInitialState(),
);
=======
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Application, ApplicationSchema } from '../types/application'
import { StateSchema } from 'app/providers'



export const applicationAdapter = createEntityAdapter<Application>({
    selectId: ( application ) => application.id
})
  
export const getApplication = applicationAdapter.getSelectors<StateSchema>(
    (state) => state.application || applicationAdapter.getInitialState()
)


>>>>>>> main

export const applicationSlice = createSlice({
    name: 'application',
    initialState: applicationAdapter.getInitialState<ApplicationSchema>({
        ids: [],
        entities: {},
        isLoading: false,
    }),
    reducers: {
<<<<<<< HEAD

=======
    
>>>>>>> main
    },

});

export const { actions: applicationActions } = applicationSlice;
export const { reducer: applicationReducer } = applicationSlice;
