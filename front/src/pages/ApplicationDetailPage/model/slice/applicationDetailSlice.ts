import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { ApplicationDetailSchema } from '../type/applicationDetail'
import { Application, ApplicationStatus } from 'entities/Application'
import { StateSchema } from 'app/providers'


const applicationDetailAdapter = createEntityAdapter<Application>({
  selectId: ( application ) => application.id
})

export const getApplicationDetail = applicationDetailAdapter.getSelectors<StateSchema>(
  (state) => state.applicationDetail || applicationDetailAdapter.getInitialState()
)

export const applicationDetailSlice = createSlice({
  name: 'applicationDetail',
  initialState: applicationDetailAdapter.getInitialState<ApplicationDetailSchema>({
    ids: [ 1 ],
    entities: {
      "1": {
        id: '1',
        createdAt: '25.12.2022',
        description: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. .....',
        subject: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее ',
        title: 'Документы на поставку IT оборудования ',
        status: ApplicationStatus.NEW,
      },
    },
    error: undefined,
    isLoading: false
  }),
  reducers: {
    setUserData: (state, action)=>{
      state.userData = action.payload
    }
  },
})

export const { actions: applicationDetailActions } = applicationDetailSlice
export const { reducer: applicationDetailReducer } = applicationDetailSlice
