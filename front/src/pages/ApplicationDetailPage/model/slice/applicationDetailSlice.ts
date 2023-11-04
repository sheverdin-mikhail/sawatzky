import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Application } from 'entities/Application';
import { StateSchema } from 'app/providers';
import { ApplicationDetailSchema } from '../type/applicationDetail';
import { fetchApplicationDetail } from '../services/fetchApplicationDetail/fetchApplicationDetail';

const applicationDetailAdapter = createEntityAdapter<Application>({
<<<<<<< HEAD
    selectId: (application) => application.id,
});

export const getApplicationDetail = applicationDetailAdapter.getSelectors<StateSchema>(
    (state) => state.applicationDetail || applicationDetailAdapter.getInitialState(),
);
=======
    selectId: ( application ) => application.id
})

export const getApplicationDetail = applicationDetailAdapter.getSelectors<StateSchema>(
    (state) => state.applicationDetail || applicationDetailAdapter.getInitialState()
)
>>>>>>> main

export const applicationDetailSlice = createSlice({
    name: 'applicationDetail',
    initialState: applicationDetailAdapter.getInitialState<ApplicationDetailSchema>({
        ids: [],
        entities: {},
        error: undefined,
<<<<<<< HEAD
        isLoading: false,
    }),
    reducers: {

    },
    extraReducers: (builder) => builder
    // Аунтификация пользователя
        .addCase(fetchApplicationDetail.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
        })
        .addCase(fetchApplicationDetail.fulfilled, (state, action: PayloadAction<Application>) => {
            state.isLoading = false;
            // @ts-ignore
            applicationDetailAdapter.setOne(state, action.payload);
        })
        .addCase(fetchApplicationDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
});
=======
        isLoading: false
    }),
    reducers: {
    
    },
    extraReducers: (builder) => builder 
    //Аунтификация пользователя
        .addCase(fetchApplicationDetail.pending, (state, action)=>{
            state.error = undefined
            state.isLoading = true
        })
        .addCase(fetchApplicationDetail.fulfilled, (state, action: PayloadAction<Application>)=>{
            state.isLoading = false
            // @ts-ignore
            applicationDetailAdapter.setOne(state, action.payload)

        })
        .addCase(fetchApplicationDetail.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
})
>>>>>>> main

export const { actions: applicationDetailActions } = applicationDetailSlice;
export const { reducer: applicationDetailReducer } = applicationDetailSlice;
